import {
   Body,
   Controller,
   Delete,
   Get,
   Patch,
   Post,
   UseGuards,
} from "@nestjs/common";
import { CreateCardDTO, IdCardDTO, UpdateCardDTO } from "./dto";
import { CardsService } from "./cards.service";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("cards")
export class CardsController {
   constructor(private readonly cardsService: CardsService) {}

   @ApiTags("Cards")
   @ApiResponse({ status: 201, type: CreateCardDTO })
   @UseGuards(JwtAuthGuard)
   @Post()
   create(@Body() dto: CreateCardDTO) {
      return this.cardsService.createCard(dto);
   }

   @ApiTags("Cards")
   @ApiResponse({ status: 200, type: CreateCardDTO })
   @Get()
   getAll() {
      return this.cardsService.getAllCards();
   }

   @ApiTags("Cards")
   @ApiResponse({ status: 200, type: CreateCardDTO })
   @UseGuards(JwtAuthGuard)
   @Get(":id")
   getOne(@Body() dto: IdCardDTO) {
      return this.cardsService.getOneCard(dto);
   }

   @ApiTags("Cards")
   @ApiResponse({ status: 200, type: CreateCardDTO })
   @UseGuards(JwtAuthGuard)
   @Patch(":id")
   update(@Body() dto: UpdateCardDTO): Promise<UpdateCardDTO> {
      return this.cardsService.updateCard(dto.id, dto);
   }

   @ApiTags("Cards")
   @ApiResponse({ status: 200, type: "Deleted" })
   @UseGuards(JwtAuthGuard)
   @Delete(":id")
   deleteOne(@Body() dto: IdCardDTO) {
      return this.cardsService.deleteCard(dto);
   }
}
