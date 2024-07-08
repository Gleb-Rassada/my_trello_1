import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { Comments } from "src/models/comments.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
   imports: [SequelizeModule.forFeature([Comments])],
   providers: [CommentsService],
   controllers: [CommentsController],
})
export class CommentsModule {}
