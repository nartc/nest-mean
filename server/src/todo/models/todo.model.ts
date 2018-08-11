import { InstanceType, ModelType, pre, prop, Typegoose } from 'typegoose';
import { schemaOptions } from '../../shared/base.model';
import { TodoLevel } from './todo-level.enum';

@pre<Todo>('findOneAndUpdate', function(next) {
    this._update.updatedAt = new Date(Date.now());
    next();
})
export class Todo extends Typegoose {
    @prop({ required: [true, 'Content is required'] })
    content: string;
    @prop({ enum: TodoLevel, default: TodoLevel.Normal })
    level: TodoLevel;
    @prop({ default: false })
    isCompleted: boolean;
    @prop({ default: Date.now() })
    createdAt?: Date;
    @prop({ default: Date.now() })
    updatedAt?: Date;
    id?: string;

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

export const TodoModel = new Todo().getModelForClass(Todo, { schemaOptions });
