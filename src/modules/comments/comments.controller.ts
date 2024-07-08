import {
   Body,
   Controller,
   Delete,
   Get,
   Patch,
   Post,
   UseGuards,
} from "@nestjs/common";
import { CreateCommentDTO, IdCommentDTO, UpdateCommentDTO } from "./dto";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "src/guards/jwt-guard";

@Controller("comments")
export class CommentsController {
   constructor(private readonly commentsService: CommentsService) {}

   @UseGuards(JwtAuthGuard)
   @Post()
   create(@Body() dto: CreateCommentDTO) {
      return this.commentsService.createComment(dto);
   }

   @Get()
   getAll() {
      return this.commentsService.getAllComments();
   }

   @UseGuards(JwtAuthGuard)
   @Get(":id")
   getOne(@Body() dto: IdCommentDTO) {
      return this.commentsService.getOneComment(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Patch(":id")
   update(@Body() dto: UpdateCommentDTO): Promise<UpdateCommentDTO> {
      return this.commentsService.updateComment(dto.id, dto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(":id")
   deleteOne(@Body() dto: IdCommentDTO) {
      return this.commentsService.deleteComment(dto);
   }
}
