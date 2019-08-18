import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { User } from './models/user.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { UserVm } from './models/view-models/user-vm.model';
import { UserService } from './user.service';

@Controller('user')
@ApiUseTags(User.modelName)
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post('register')
    @ApiCreatedResponse({ type: UserVm })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async register(@Body() vm: RegisterVm): Promise<UserVm> {
        const { username, password } = vm;

        if (!username) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
        }

        let exist;
        try {
            exist = await this._userService.findOne({ username });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
        }

        const newUser = await this._userService.register(vm);
        console.log(newUser);
        return this._userService.map(newUser, User, UserVm);
    }

    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseVm })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Login'))
    async login(@Body() vm: LoginVm): Promise<LoginResponseVm> {
        const fields = Object.keys(vm);
        fields.forEach(field => {
            if (!vm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._userService.login(vm);
    }
}
