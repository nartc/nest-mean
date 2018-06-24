import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt-strategy.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
    providers: [ConfigurationService, MapperService, AuthService, JwtStrategy],
    exports: [ConfigurationService, MapperService, AuthService],
    imports: [UserModule],
})
export class SharedModule {}
