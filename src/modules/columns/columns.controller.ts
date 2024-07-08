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
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("columns")
export class ColumnsController {
   constructor(private readonly columnsService: ColumnsService) {}

   @ApiTags("Columns")
   @ApiResponse({ status: 201, type: CreateColumnDTO })
   @UseGuards(JwtAuthGuard)
   @Post()
   create(@Body() dto: CreateColumnDTO) {
      return this.columnsService.createColumn(dto);
   }

   @ApiTags("Columns")
   @ApiResponse({ status: 200, type: CreateColumnDTO })
   @Get()
   getAll() {
      return this.columnsService.getAllColumns();
   }

   @ApiTags("Columns")
   @ApiResponse({ status: 200, type: CreateColumnDTO })
   @UseGuards(JwtAuthGuard)
   @Get(":id")
   getOne(@Body() dto: IdColumnDTO) {
      return this.columnsService.getOneColumn(dto);
   }

   @ApiTags("Columns")
   @ApiResponse({ status: 200, type: CreateColumnDTO })
   @UseGuards(JwtAuthGuard)
   @Patch(":id")
   update(@Body() dto: UpdateColumnDTO): Promise<UpdateColumnDTO> {
      return this.columnsService.updateColumn(dto.id, dto);
   }

   @ApiTags("Columns")
   @ApiResponse({ status: 200, type: "Deleted" })
   @UseGuards(JwtAuthGuard)
   @Delete(":id")
   deleteOne(@Body() dto: IdColumnDTO) {
      return this.columnsService.deleteColumn(dto);
   }
}
