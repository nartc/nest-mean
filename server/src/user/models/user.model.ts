import { BaseModel, schemaOptions } from '../../shared/base.model';
import { UserRole } from './user-role.enum';
import { prop, ModelType } from 'typegoose';

export const USER_MODEL = 'User';
export class User extends BaseModel {
    @prop({
        required: [true, 'Username is required'],
        unique: true,
        minlength: [6, 'Must be at least 6 characters'],
    })
    username: string;

    @prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters'],
    })
    password: string;

    @prop() firstName?: string;

    @prop() lastName?: string;

    @prop({ enum: UserRole })
    role?: UserRole;

    @prop()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    static get model(): ModelType<User> {
        return new User().getModelForClass(User, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}
