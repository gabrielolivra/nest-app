import { Request } from 'express';
import { Users } from '../../users/users.entity';

export interface AuthRequest extends Request {
    user: Users;
}