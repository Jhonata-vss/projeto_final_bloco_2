﻿﻿import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult, LessThan, MoreThan } from "typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ){}

    async findAll():Promise<Produto[]> {

        return await this.produtoRepository.find({
            relations: {
                categoria:true
            }
        });
    }

    async findById (id:number) : Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations:{
                categoria:true
            }
        });

        if(!produto)
            throw new HttpException("O Produto não foi encontrado",HttpStatus.NOT_FOUND)

        return produto;
    }

    async findByNome(nome:string):Promise<Produto[]> {

        return await this.produtoRepository.find({
            where:{
                nome:ILike(`%${nome}%`)
            },
            relations: {
                categoria:true
            }
        });
    }

    async findByPrecoMaiorQue(preco: number ) : Promise<Produto[]>{
        return await this.produtoRepository.find({
            where: {
                preco: MoreThan(preco)  
            },
            order: {
                preco: "ASC"
            },
            relations: {
                categoria:true
            }
        })
    }

    async findByPrecoMenorQue(preco: number ) : Promise<Produto[]>{
        return await this.produtoRepository.find({
            where: {
                preco: LessThan(preco)
                
            },
            order: {
                preco: "DESC"
            },
            relations: {
                categoria:true
            }
        })
    }

    async create(produto:Produto) : Promise<Produto>{

        if(produto.categoria) {
            await this.categoriaService.findById(produto.categoria.id)
            return await this.produtoRepository.save(produto)
        }

        return await this.produtoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto> {
        
        let buscaProduto = await this.findById(produto.id);

        if(!buscaProduto || !produto.id)
            throw new HttpException('O produto não foi encontrado!', HttpStatus.NOT_FOUND)
        
     
        if(produto.categoria){

            await this.categoriaService.findById(produto.categoria.id)

            return await this.produtoRepository.save(produto);
        }

        return await this.produtoRepository.save(produto);

    }

    async delete(id:number):Promise<DeleteResult> {
        
        let produto =  await this.findById(id);

        if(!produto)
            throw new HttpException("O Produto não foi encontrado",HttpStatus.NOT_FOUND)

        return await this.produtoRepository.delete(produto);

    }
}