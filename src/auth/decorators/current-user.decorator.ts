import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '../../users/users.entity';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): Users => {
        const request = context.switchToHttp().getRequest<AuthRequest>();

        return request.user;
    },
);