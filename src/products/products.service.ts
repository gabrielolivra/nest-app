import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,) { }

    findAll(): Promise<Products[]> {
        return this.productsRepository.find()
    }

    findOne(id: number): Promise<Products> {
        return this.productsRepository.findOne({ where: { id } })
    }

    findOneText(nome: string): Promise<Products> {
        return this.productsRepository.findOne({ where: { nome } })
    }
    create(products: Products): Promise<Products> {
        return this.productsRepository.save(products)
    }

    remove(id: number): Promise<Products> {

        this.productsRepository.delete(id);

        return
    }
    async update(id: number, updateData: Partial<Products>): Promise<Products> {
        const product = await this.productsRepository.findOne({ where: { id } })
        if (!product) {
            throw new NotFoundException(`Produto com id ${id} não encontrado`)
        }
        if (updateData.nome) {

            product.nome = updateData.nome

        }
        if (updateData.quantidade) {
            product.quantidade = updateData.quantidade

        }
        Object.assign(product)

        return this.productsRepository.save(product)
    }
}