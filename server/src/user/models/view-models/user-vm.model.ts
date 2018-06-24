import { BaseModelVm } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utitlies/enum-to-array.helper';

export class UserVm extends BaseModelVm {
    @ApiModelProperty() username: string;
    @ApiModelPropertyOptional() firstName?: string;
    @ApiModelPropertyOptional() lastName?: string;
    @ApiModelPropertyOptional() fullName?: string;
    @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) })
    role?: UserRole;
}
