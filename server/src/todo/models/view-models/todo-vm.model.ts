import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';
import { TodoLevel } from '../todo-level.enum';

export class TodoVm extends BaseModelVm {
    @ApiModelProperty() content: string;
    @ApiModelProperty({ enum: TodoLevel })
    level: TodoLevel;
    @ApiModelProperty() isCompleted: boolean;
}
