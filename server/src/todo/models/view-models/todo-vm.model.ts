import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';
import { TodoLevel } from '../todo-level.enum';
import { Expose } from 'class-transformer';

export class TodoVm extends BaseModelVm {
    @ApiModelProperty() 
    @Expose()
    content: string;
    @ApiModelProperty({ enum: TodoLevel })
    @Expose()
    level: TodoLevel;
    @ApiModelProperty() 
    @Expose()
    isCompleted: boolean;
}
