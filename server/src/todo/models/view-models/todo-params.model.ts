import { TodoLevel } from '../todo-level.enum';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utitlies/enum-to-array.helper';

export class TodoParams {
    @ApiModelProperty() content: string;
    @ApiModelPropertyOptional({ enum: EnumToArray(TodoLevel), example: TodoLevel.Normal })
    level?: TodoLevel;
}
