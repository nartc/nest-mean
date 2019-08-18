import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/models/user-role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
