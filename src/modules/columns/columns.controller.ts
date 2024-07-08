import {
   Body,
   Controller,
   Delete,
   Get,
   Patch,
   Post,
   UseGuards,
} from "@nestjs/common";
import { ColumnsService } from "./columns.service";
import { CreateColumnDTO, IdColumnDTO, UpdateColumnDTO } from "./dto";
import { JwtAuthGuard } from "src/guards/jwt-guard";

@Controller("columns")
export class ColumnsController {
   constructor(private readonly columnsService: ColumnsService) {}

   @UseGuards(JwtAuthGuard)
   @Post()
   create(@Body() dto: CreateColumnDTO) {
      return this.columnsService.createColumn(dto);
   }

   @Get()
   getAll() {
      return this.columnsService.getAllColumns();
   }

   @UseGuards(JwtAuthGuard)
   @Get(":id")
   getOne(@Body() dto: IdColumnDTO) {
      return this.columnsService.getOneColumn(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Patch(":id")
   update(@Body() dto: UpdateColumnDTO): Promise<UpdateColumnDTO> {
      return this.columnsService.updateColumn(dto.id, dto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(":id")
   deleteOne(@Body() dto: IdColumnDTO) {
      return this.columnsService.deleteColumn(dto);
   }
}
