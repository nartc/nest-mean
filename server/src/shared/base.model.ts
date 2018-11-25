import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
import { Typegoose, prop, pre, ModelType } from 'typegoose';

export class BaseModelVm {
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    createdAt?: Date;

    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    updatedAt?: Date;

    @ApiModelPropertyOptional() id?: string;
}

@pre<T>('findOneAndUpdate', function() {
    this._update.updatedAt = new Date(Date.now());
})
export abstract class BaseModel<T> extends Typegoose {
    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    createdAt: Date;

    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    updatedAt: Date;

    @ApiModelPropertyOptional()
    id: string;
}

export const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
