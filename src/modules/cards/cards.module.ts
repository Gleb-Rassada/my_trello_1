import { Module } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CardsController } from "./cards.controller";
import { Cards } from "src/models/cards.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
   imports: [SequelizeModule.forFeature([Cards])],
   providers: [CardsService],
   controllers: [CardsController],
})
export class CardsModule {}
