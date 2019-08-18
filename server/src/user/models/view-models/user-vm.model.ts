import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { Expose } from 'class-transformer';

export class UserVm extends BaseModelVm {
    @ApiModelProperty() 
    @Expose()
    username: string;
    @ApiModelPropertyOptional() 
    @Expose()
    firstName?: string;
    @ApiModelPropertyOptional() 
    @Expose()
    lastName?: string;
    @ApiModelPropertyOptional() 
    @Expose()
    fullName?: string;
    @ApiModelPropertyOptional({ enum: UserRole })
    @Expose()
    role?: UserRole;
}
