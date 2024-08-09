﻿import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Body, Put, Delete } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";

@Controller("/produtos")
export class ProdutoController{

    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK) 
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }
    
    @Get('/:id')
    @HttpCode(HttpStatus.OK) 
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK) 
    findByNome(@Param('nome') nome: string): Promise<Produto[]>{
        return this.produtoService.findByNome(nome);
    }

    @Get('/precoMaiorQue/:preco')
    @HttpCode(HttpStatus.OK) 
    findByPrecoMaiorQue(@Param('preco',ParseIntPipe) preco: number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMaiorQue(preco);
    }

    
    @Get('/precoMenorQue/:preco')
    @HttpCode(HttpStatus.OK) 
    findByPrecoMenorQue(@Param('preco',ParseIntPipe) preco: number): Promise<Produto[]>{
        return this.produtoService.findByPrecoMenorQue(preco);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED) 
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) 
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }
}