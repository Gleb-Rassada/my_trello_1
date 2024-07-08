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
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("comments")
export class CommentsController {
   constructor(private readonly commentsService: CommentsService) {}

   @ApiTags("Comments")
   @ApiResponse({ status: 201, type: CreateCommentDTO })
   @UseGuards(JwtAuthGuard)
   @Post()
   create(@Body() dto: CreateCommentDTO) {
      return this.commentsService.createComment(dto);
   }

   @ApiTags("Comments")
   @ApiResponse({ status: 200, type: CreateCommentDTO })
   @Get()
   getAll() {
      return this.commentsService.getAllComments();
   }

   @ApiTags("Comments")
   @ApiResponse({ status: 200, type: CreateCommentDTO })
   @UseGuards(JwtAuthGuard)
   @Get(":id")
   getOne(@Body() dto: IdCommentDTO) {
      return this.commentsService.getOneComment(dto);
   }

   @ApiTags("Comments")
   @ApiResponse({ status: 200, type: CreateCommentDTO })
   @UseGuards(JwtAuthGuard)
   @Patch(":id")
   update(@Body() dto: UpdateCommentDTO): Promise<UpdateCommentDTO> {
      return this.commentsService.updateComment(dto.id, dto);
   }

   @ApiTags("Comments")
   @ApiResponse({ status: 200, type: "Deleted" })
   @UseGuards(JwtAuthGuard)
   @Delete(":id")
   deleteOne(@Body() dto: IdCommentDTO) {
      return this.commentsService.deleteComment(dto);
   }
}
