import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

    form: FormGroup;
    todos = [];
    editableCache = {};

    availableLevels = [];

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.initForm();
        this.getTodos();
        this.getAvailableLevels();
        this.updateEditableCache();
    }

    startEditContent(id: number) {
        this.editableCache[id].content.edit = true;
    }

    finishEditContent(id: number) {
        this.todos.find(todo => todo.id === id).content = this.editableCache[id].content.data;
        this.editableCache[id].content.edit = false;
    }

    startEditLevel(id: number) {
        this.editableCache[id].level.edit = true;
    }

    finishEditLevel(id: number) {
        this.todos.find(todo => todo.id === id).level = this.editableCache[id].level.data;
        this.editableCache[id].level.edit = false;
    }

    onStatusChanged(status: boolean) {

    }

    onSubmit() {
        if (this.form.invalid) {
            this.displayValidationErrors();
            return;
        }

        const { content, level } = this.form.value;
        this.todos = [
            {
                content,
                level,
                isCompleted: false,
                id: this.todos.length + 1,
            },
            ...this.todos,
        ];
        this.updateEditableCache();
        this.form.get('content').reset();
        this.form.get('level').reset();
        this.form.get('level').setValue('Normal');
    }

    private updateEditableCache() {
        console.log(this.todos);
        this.todos.forEach(todo => {
            if (!this.editableCache[todo.id]) {
                this.editableCache[todo.id] = {};
                Object.keys(todo).forEach(key => {
                    if (!this.editableCache[todo.id][key]) {
                        this.editableCache[todo.id][key] = {
                            data: todo[key],
                            edit: false,
                        };
                    }
                });
            }
        });
    }

    private getAvailableLevels() {
        this.availableLevels = ['Low', 'Normal', 'High'];
    }

    private getTodos() {
        this.todos = [
            {
                content: 'First todo',
                isCompleted: false,
                level: 'Normal',
                id: 1,
            },
            {
                content: 'Second todo',
                isCompleted: true,
                level: 'High',
                id: 2,
            },
            {
                content: 'Third todo',
                isCompleted: false,
                level: 'Low',
                id: 3,
            },
        ];
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
}
