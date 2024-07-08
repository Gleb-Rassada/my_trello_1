import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cards } from "src/models/Cards.model";
import { CreateCardDTO, IdCardDTO, UpdateCardDTO } from "./dto";
import { AppError } from "src/common/constans/errors";

@Injectable()
export class CardsService {
   constructor(
      @InjectModel(Cards) private readonly CardRepository: typeof Cards
   ) {}
   // Создание карточки
   async createCard(dto: CreateCardDTO): Promise<CreateCardDTO> {
      const Card = await this.CardRepository.create(dto);
      return Card;
   }

   // получение всех карт
   async getAllCards() {
      const Cards = await this.CardRepository.findAll();
      return Cards;
   }

   async getOneCard(dto: IdCardDTO): Promise<UpdateCardDTO> {
      const id = dto.id;
      const existCard = await this.findCardById(id);
      if (!existCard) throw new BadRequestException(AppError.CARD_NOT_EXIST);
      return await this.CardRepository.findOne({ where: { id } });
   }

   async updateCard(id: number, dto: UpdateCardDTO): Promise<UpdateCardDTO> {
      const existCard = await this.findCardById(id);
      if (!existCard) throw new BadRequestException(AppError.CARD_NOT_EXIST);
      await this.CardRepository.update(dto, { where: { id } });
      return dto;
   }

   async findCardById(id: number) {
      return await this.CardRepository.findOne({
         where: { id: id },
      });
   }

   async deleteCard(dto: IdCardDTO) {
      const id = dto.id;
      const existCard = await this.findCardById(id);
      if (!existCard) throw new BadRequestException(AppError.CARD_NOT_EXIST);
      await this.CardRepository.destroy({ where: { id } });
      return "Card has been deleted";
   }
}
