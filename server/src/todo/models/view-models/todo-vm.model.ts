import { BaseModelVm } from '../../../shared/base.model';
import { TodoLevel } from '../todo-level.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utitlies/enum-to-array.helper';

export class TodoVm extends BaseModelVm {
    @ApiModelProperty() content: string;
    @ApiModelProperty({ enum: EnumToArray(TodoLevel) })
    level: TodoLevel;
    @ApiModelProperty() isCompleted: boolean;
}
