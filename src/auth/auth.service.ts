import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) { }

    async login(user: Users): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, password: string): Promise<Users> {
        const user = await this.userService.findOneEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        throw new UnauthorizedError(
            'Email address or password provided is incorrect.',
        );
    }
}