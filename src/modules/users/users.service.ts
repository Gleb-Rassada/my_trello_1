import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { CreateUserDTO, IdUserDTO, UpdateUserDTO } from "./dto";
import { Users } from "src/models/users.model";
import { AppError } from "src/common/constans/errors";

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(Users) private readonly userRepository: typeof Users
   ) {}

   async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
      dto.userPassword = await this.hashPasswod(dto.userPassword);
      const newUser = {
         userName: dto.userName,
         userEmail: dto.userEmail,
         userPassword: dto.userPassword,
      };
      await this.userRepository.create(newUser);
      return dto;
   }

   // выводит все значения таблицы users с паролями в том числе
   async getAllUsers() {
      return await this.userRepository.findAll({});
   }

   async getOneUser(dto: IdUserDTO): Promise<UpdateUserDTO> {
      const id = dto.id;
      const existUser = await this.findUserById(id);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST_ID);
      const responceData = this.publicUserId(id);
      await this.userRepository.findOne({ where: { id } });
      return responceData;
   }

   async updateUser(id: number, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
      const existUser = await this.findUserById(id);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST_ID);
      await this.userRepository.update(dto, { where: { id } });
      // возвращаем значения на frontend
      return dto;
   }

   // удаление пользователя с прооверкой
   // существует ли пользователь с таким id в БД
   async deleteUser(dto: IdUserDTO) {
      const id = dto.id;
      const existUser = await this.findUserById(id);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST_ID);
      await this.userRepository.destroy({ where: { id } });
      return "User has been deleted";
   }

   // хэширование пароля
   async hashPasswod(userPassword) {
      return bcrypt.hash(userPassword, 10);
   }

   //   проверка на уникальность нового зарегистрированного пользователя по емейлу
   async findUserByEmail(userEmail: string) {
      return await this.userRepository.findOne({
         where: { userEmail /* userEmail: userEmail */ },
      });
   }

   async findUserById(id: number) {
      return await this.userRepository.findOne({
         where: { id: id },
      });
   }

   //возвращает всё, кроме пароля
   async publicUserId(id: number) {
      return await this.userRepository.findOne({
         where: { id },
         attributes: { exclude: ["userPassword"] },
      });
   }

   //возвращает всё, кроме пароля
   async publicUser(userEmail: string) {
      return await this.userRepository.findOne({
         where: { userEmail },
         attributes: { exclude: ["userPassword"] },
      });
   }
}
