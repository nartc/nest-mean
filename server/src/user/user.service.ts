import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, InstanceType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { AuthService } from '../shared/auth/auth.service';
import { RegisterVm } from './models/view-models/register-vm.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginVm } from './models/view-models/login-vm.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { JwtPayload } from '../shared/auth/jwt-payload.model';
import { UserVm } from './models/view-models/user-vm.model';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,
    ) {
        super();
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }

    async register(vm: RegisterVm): Promise<User> {
        const { username, password, firstName, lastName } = vm;

        const newUser = new this._model();
        newUser.username = username.trim().toLowerCase();
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return result.toJSON() as User;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(vm: LoginVm): Promise<LoginResponseVm> {
        const { username, password } = vm;

        const user = await this.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            username: user.username,
            role: user.role,
        };

        const token = await this._authService.signPayload(payload);
        const userVm: UserVm = await this.map<UserVm>(user.toJSON());

        return {
            token,
            user: userVm,
        };
    }
}
