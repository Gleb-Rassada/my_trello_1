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

@Controller("cards")
export class CardsController {
   constructor(private readonly cardsService: CardsService) {}

   @UseGuards(JwtAuthGuard)
   @Post()
   create(@Body() dto: CreateCardDTO) {
      return this.cardsService.createCard(dto);
   }

   @Get()
   getAll() {
      return this.cardsService.getAllCards();
   }

   @UseGuards(JwtAuthGuard)
   @Get(":id")
   getOne(@Body() dto: IdCardDTO) {
      return this.cardsService.getOneCard(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Patch(":id")
   update(@Body() dto: UpdateCardDTO): Promise<UpdateCardDTO> {
      return this.cardsService.updateCard(dto.id, dto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete(":id")
   deleteOne(@Body() dto: IdCardDTO) {
      return this.cardsService.deleteCard(dto);
   }
}
