import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "../../models/users.model";

@Module({
   // используем метод  forFeature, это значит, что логика
   // Sequelize модуля, будет использоваться в рамках текущего модуля
   imports: [SequelizeModule.forFeature([Users])],
   controllers: [UsersController],
   providers: [UsersService],
   exports: [UsersService],
   // Экспортируем сервисы, чтобы обращаться
   // к ним из другого модуля либо сервиса
})
export class UsersModule {}
