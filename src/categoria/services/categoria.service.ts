﻿import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async findAll():Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async findById(id:number):Promise<Categoria> {
        let categoria =  await this.categoriaRepository.findOne({
            where: {
                id
            }
        });

        if(!categoria)
            throw new HttpException("A categoria não foi encontrada",HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findByTipo(tipo:string):Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            }
        })
    }

    async create(categoria:Categoria):Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria:Categoria):Promise<Categoria> {

        let buscaCategoria = await this.findById(categoria.id);

        if(!buscaCategoria || !categoria.id)
            throw new HttpException("A categoria não foi encontrada",HttpStatus.NOT_FOUND)

        return await this.categoriaRepository.save(categoria);

    }

    async delete(id:number): Promise<DeleteResult> {
        
        let categoria = await this.findById(id);

        if(!categoria)
            throw new HttpException("A categoria não foi encontrada",HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id);

    }
}