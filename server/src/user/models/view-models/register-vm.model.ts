import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';

export class RegisterVm extends LoginVm {
    @ApiModelPropertyOptional({ example: 'John' })
    firstName?: string;

    @ApiModelPropertyOptional({ example: 'Doe' })
    lastName?: string;
}
