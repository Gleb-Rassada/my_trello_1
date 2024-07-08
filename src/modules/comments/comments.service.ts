import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comments } from "src/models/Comments.model";
import { CreateCommentDTO, IdCommentDTO, UpdateCommentDTO } from "./dto";
import { AppError } from "src/common/constans/errors";

@Injectable()
export class CommentsService {
   constructor(
      @InjectModel(Comments) private readonly commentRepository: typeof Comments
   ) {}
   // Создание карточки
   async createComment(dto: CreateCommentDTO): Promise<CreateCommentDTO> {
      const Comment = await this.commentRepository.create(dto);
      return Comment;
   }

   // получение всех карт
   async getAllComments() {
      const Comments = await this.commentRepository.findAll();
      return Comments;
   }

   async getOneComment(dto: IdCommentDTO): Promise<UpdateCommentDTO> {
      const id = dto.id;
      const existComment = await this.findCommentById(id);
      if (!existComment)
         throw new BadRequestException(AppError.COMMENT_NOT_EXIST);
      return await this.commentRepository.findOne({ where: { id } });
   }

   async updateComment(
      id: number,
      dto: UpdateCommentDTO
   ): Promise<UpdateCommentDTO> {
      const existComment = await this.findCommentById(id);
      if (!existComment)
         throw new BadRequestException(AppError.COMMENT_NOT_EXIST);
      await this.commentRepository.update(dto, { where: { id } });
      return dto;
   }

   async findCommentById(id: number) {
      return await this.commentRepository.findOne({
         where: { id: id },
      });
   }

   async deleteComment(dto: IdCommentDTO) {
      const id = dto.id;
      const existComment = await this.findCommentById(id);
      if (!existComment)
         throw new BadRequestException(AppError.COMMENT_NOT_EXIST);
      await this.commentRepository.destroy({ where: { id } });
      return "Comment has been deleted";
   }
}
