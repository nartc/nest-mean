import { Document, SchemaOptions } from 'mongoose';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export interface BaseModel extends Document {
    createdAt?: Date;
    updatedAt?: Date;
}

export class BaseModelVm {
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    createdAt?: Date;

    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    updatedAt?: Date;

    @ApiModelPropertyOptional() id?: string;
}

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
