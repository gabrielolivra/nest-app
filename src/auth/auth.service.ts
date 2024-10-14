import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneEmail(email);
        console.log(user)
        console.log(await bcrypt.compare(pass, user.password))
        console.log(pass, user.password)
        const isPasswordValid = user && await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            console.log('oi')
            throw new UnauthorizedException();
            console.log('oi')
        }

        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}