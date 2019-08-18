import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
import { Typegoose, prop } from 'typegoose';
import { Expose } from 'class-transformer';

export class BaseModelVm {
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    createdAt?: Date;

    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    updatedAt?: Date;

    @ApiModelPropertyOptional() 
    @Expose()
    id?: string;
}

export abstract class BaseModel<T> extends Typegoose {
    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    createdAt: Date;

    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    updatedAt: Date;

    @ApiModelPropertyOptional()
    @Expose()
    id: string;
}

export const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
