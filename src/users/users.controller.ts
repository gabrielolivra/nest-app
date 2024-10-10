import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Response } from 'express';



@Controller('users')
export class UsersController {

    constructor(private readonly userServices: UsersService) { }
    @Post()
    async create(@Body() user: Users, @Res() response: Response): Promise<Response> {
        const add_user = new Users()
        add_user.name = user.name
        add_user.email = user.email
        add_user.password = user.password

        const exists_email = await this.userServices.findOneEmail(user.email)

        if (exists_email) {
            return response.json({ erro: "Email já cadastrado" })
        }
        else {
            if (user.name && user.email && user.password) {
                const create_user = await this.userServices.create(user)
                return response.json(create_user)
            }
            else {
                return response.json({ error: "Usuario, senha e email são obrigatorios" })
            }
        }

    }

    @Get(':id')
    async find(@Param('id') id: string, @Res() response: Response): Promise<Response> {
        // const user = new Users;
        const exists_user = await this.userServices.findOne(Number(id))
        if (!exists_user) {
            return response.json({ error: "Nenhum usuario encontrado" })
        }
        else {
            return response.json(exists_user)
        }

    }

}
