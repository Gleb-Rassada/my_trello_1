import { Module } from "@nestjs/common";
import { ColumnsController } from "./columns.controller";
import { ColumnsService } from "./columns.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Columns } from "src/models/columns.model";

@Module({
   imports: [SequelizeModule.forFeature([Columns])],
   controllers: [ColumnsController],
   providers: [ColumnsService],
})
export class ColumnsModule {}
