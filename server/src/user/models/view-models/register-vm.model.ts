import { LoginVm } from './login-vm.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class RegisterVm extends LoginVm {
    @ApiModelPropertyOptional({ example: 'John' })
    firstName?: string;

    @ApiModelPropertyOptional({ example: 'Doe' })
    lastName?: string;
}
