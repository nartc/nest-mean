import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { Todo } from './models/todo.model';
import { TodoParams } from './models/view-models/todo-params.model';

@Injectable()
export class TodoService extends BaseService<Todo> {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Todo.modelName) private readonly _todoModel: ModelType<Todo>,
        private readonly _mapperService: MapperService,
    ) {
        super();
        this._model = _todoModel;
        this._mapper = _mapperService.mapper;
    }

    async createTodo(params: TodoParams): Promise<Todo> {
        const { content, level } = params;

        const newTodo = Todo.createModel();

        newTodo.content = content;

        if (level) {
            newTodo.level = level;
        }

        try {
            const result = await this.create(newTodo);
            return result.toJSON() as Todo;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
