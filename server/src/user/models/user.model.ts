import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { UserRole } from './user-role.enum';
import { Expose } from 'class-transformer';

export class User extends BaseModel<User> {
    @prop({
        required: [true, 'Username is required'],
        unique: true,
        minlength: [6, 'Must be at least 6 characters'],
    })
    @Expose()
    username: string;

    @prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters'],
    })
    @Expose()
    password: string;

    @prop()
    @Expose()
    firstName?: string;

    @prop()
    @Expose()
    lastName?: string;

    @prop({ enum: UserRole, default: UserRole.User })
    @Expose()
    role?: UserRole;

    @prop()
    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    static get model(): ModelType<User> {
        return new User().getModelForClass(User, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): InstanceType<User> {
        return new this.model();
    }
}
