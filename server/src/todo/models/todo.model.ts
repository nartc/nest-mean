import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { TodoLevel } from './todo-level.enum';
import { Expose } from 'class-transformer';

export class Todo extends BaseModel<Todo> {
    @prop({ required: [true, 'Content is required'] })
    @Expose()
    content: string;
    @prop({ enum: TodoLevel, default: TodoLevel.Normal })
    @Expose()
    level: TodoLevel;
    @prop({ default: false })
    @Expose()
    isCompleted: boolean;

    static get model(): ModelType<Todo> {
        return new Todo().getModelForClass(Todo, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): InstanceType<Todo> {
        return new this.model();
    }
}
