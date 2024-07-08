import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Columns } from "src/models/columns.model";
import { CreateColumnDTO, IdColumnDTO, UpdateColumnDTO } from "./dto";
import { AppError } from "src/common/constans/errors";

@Injectable()
export class ColumnsService {
   constructor(
      @InjectModel(Columns) private readonly columnRepository: typeof Columns
   ) {}
   // Создание колонки
   async createColumn(dto: CreateColumnDTO): Promise<CreateColumnDTO> {
      const column = await this.columnRepository.create(dto);
      return column;
   }

   // получение всех колонок
   async getAllColumns() {
      const columns = await this.columnRepository.findAll();
      return columns;
   }

   async getOneColumn(dto: IdColumnDTO): Promise<UpdateColumnDTO> {
      const id = dto.id;
      const existColumn = await this.findColumnById(id);
      if (!existColumn)
         throw new BadRequestException(AppError.COLUMN_NOT_EXIST);
      return await this.columnRepository.findOne({ where: { id } });
   }

   async updateColumn(
      id: number,
      dto: UpdateColumnDTO
   ): Promise<UpdateColumnDTO> {
      const existColumn = await this.findColumnById(id);
      if (!existColumn)
         throw new BadRequestException(AppError.COLUMN_NOT_EXIST);
      await this.columnRepository.update(dto, { where: { id } });
      return dto;
   }

   async findColumnById(id: number) {
      return await this.columnRepository.findOne({
         where: { id: id },
      });
   }

   async deleteColumn(dto: IdColumnDTO) {
      const id = dto.id;
      const existColumn = await this.findColumnById(id);
      if (!existColumn)
         throw new BadRequestException(AppError.COLUMN_NOT_EXIST);
      await this.columnRepository.destroy({ where: { id } });
      return "Column has been deleted";
   }
}
