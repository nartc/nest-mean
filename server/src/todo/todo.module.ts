import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo } from './models/todo.model';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Todo.modelName, schema: Todo.model.schema }]), HttpModule],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule {
}
