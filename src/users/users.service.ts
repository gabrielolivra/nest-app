import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,) { }

    findAll(): Promise<Users[]> {
        return this.usersRepository.find()
    }

    findOne(id: number): Promise<Users> {
        return this.usersRepository.findOne({ where: { id } })
    }

    findOneEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({ where: { email } })
    }

    async create(users: Users): Promise<Users> {
        const hashedPassword = await bcrypt.hash(users.password, 10);
        users.password = hashedPassword;
        return this.usersRepository.save(users);

    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }
}
