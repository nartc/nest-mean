import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { TodoLevel } from '../todo-level.enum';

export class TodoParams {
    @ApiModelProperty() content: string;
    @ApiModelPropertyOptional({ enum: TodoLevel, example: TodoLevel.Normal })
    level?: TodoLevel;
}
