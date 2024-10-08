import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { Response } from 'express';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsServices: ProductsService) { }

    @Get()
    async findAll(@Res() response: Response): Promise<Response> {
        const all_products = await this.productsServices.findAll()
        if (all_products.length > 0) {
            return response.status(HttpStatus.ACCEPTED).json(all_products)
        }
        return response.status(HttpStatus.BAD_REQUEST).json({ error: "Não há produtos cadastrados" })
    }

    @Get(':id')
    find(@Param('id') id: string): Promise<Products> {
        return this.productsServices.findOne(Number(id))
    }

    @Post()
    async create(@Body() product: Products, @Res() response: Response): Promise<Response> {
        const produto = new Products();
        produto.nome = product.nome;
        produto.quantidade = product.quantidade

        const ja_existe = await this.productsServices.findOneText(produto.nome)
        if (ja_existe) {
            return response.status(HttpStatus.BAD_REQUEST).json({ error: "Produto já cadastrado" })
        }
        else {
            if (produto.nome && produto.quantidade) {
                const produto_criado = await this.productsServices.create(produto)
                return response.status(HttpStatus.CREATED).json(produto_criado)

            }
            else {
                return response.status(HttpStatus.BAD_REQUEST).json({ error: 'Produto não cadastrado, preencha todos os campos' });
            }
        }

    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() response: Response) {
        const verifica_id = await this.productsServices.findOne(Number(id))

        if (verifica_id) {
            this.productsServices.remove(Number(id))
            return response.status(HttpStatus.ACCEPTED).json({ sucesso: "Produto removido com sucesso" })
        }
        else {
            return response.status(HttpStatus.BAD_REQUEST).json({ error: "Id não existe" })
        }

    }
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<Products>, @Res() response: Response): Promise<Response> {

        try {

            const atualizao_produto = await this.productsServices.update(id, updateData)

            return response.status(HttpStatus.ACCEPTED).json({ atualizao_produto })

        }
        catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ error: error.message })
            }
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao atualizar o produto' });
        }
    }

}


