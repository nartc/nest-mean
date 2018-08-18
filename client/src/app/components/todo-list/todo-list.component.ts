import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoClient, TodoParams, TodoVm } from '../../app.api';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

    form: FormGroup;
    todos: TodoVm[] = [];
    editableCache = {};

    availableLevels = [];

    constructor(private _formBuilder: FormBuilder,
                private _todoClient: TodoClient) { }

    ngOnInit() {
        this.initForm();
        this.getTodos();
        this.getAvailableLevels();
    }

    onStatusChanged(status: boolean, todo: TodoVm) {
        todo.isCompleted = status;
        this._todoClient.update(todo)
            .subscribe((updatedTodo: TodoVm) => {
                const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
                this.todos.splice(index, 1, updatedTodo);
                this.updateEditableCache();
            });
    }

    onSubmit() {
        if (this.form.invalid) {
            this.displayValidationErrors();
            return;
        }

        const todoParams: TodoParams = new TodoParams(this.form.value);
        this._todoClient.create(todoParams)
            .subscribe((newTodo: TodoVm) => {
                this.todos = [newTodo, ...this.todos];
                this.updateEditableCache();
                this.form.get('content').reset();
                this.form.get('level').reset();
                this.form.get('level').setValue('Normal');
            });
    }

    private updateEditableCache() {
        this.todos.forEach(todo => {
            if (!this.editableCache[todo.id]) {
                this.editableCache[todo.id] = {};
            }

            Object.keys(todo).forEach(key => {
                this.editableCache[todo.id][key] = {
                    data: todo[key],
                    edit: false,
                };
            });
        });
    }

    private getAvailableLevels() {
        this.availableLevels = ['Low', 'Normal', 'High'];
    }

    private getTodos() {
        this._todoClient.getall()
            .subscribe((todos: TodoVm[]) => {
                this.todos = todos;
                this.updateEditableCache();
            });
    }

    private initForm() {
        this.form = this._formBuilder.group({
            content: ['', Validators.required],
            level: 'Normal',
        });
    }

    private displayValidationErrors() {
        const formKeys = Object.keys(this.form.controls);
        formKeys.forEach(key => {
            this.form.controls[key].markAsDirty();
            this.form.controls[key].updateValueAndValidity();
        });
    }

    finishEdit(todo: TodoVm, key: string) {
        todo[key] = this.editableCache[todo.id][key].data;
        this._todoClient.update(todo)
            .subscribe((updated: TodoVm) => {
                const index = this.todos.findIndex(t => t.id === updated.id);
                this.todos.splice(index, 1, updated);
                this.updateEditableCache();
            });
    }

    startEdit(todo: TodoVm, key: string) {
        this.editableCache[todo.id][key].edit = true;
    }
}
