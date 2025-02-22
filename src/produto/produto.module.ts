import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { CategoriaModule } from "../categoria/categoria.module";
import { ProdutoService } from "./services/produto.service";
import { CategoriaService } from "../categoria/services/categoria.service";
import { ProdutoController } from "./controllers/produto.controllers";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]),CategoriaModule],
    providers: [ProdutoService,CategoriaService],
    controllers: [ProdutoController],
    exports: [TypeOrmModule]
})
export class ProdutoModule {}