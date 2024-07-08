import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDTO } from "../users/dto";
import { AppError } from "src/common/constans/errors";
import { UserLoginDTO } from "./dto";
import * as bcrypt from "bcrypt";
import { AuthUserResponce } from "./responce";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly tokenService: TokenService
   ) {}

   // Регистрация нового пользователя
   async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
      const existUser = await this.usersService.findUserByEmail(dto.userEmail);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);
      return this.usersService.createUser(dto);
   }

   // Аунтефикация пользователя, прверка что такой есть в БД
   async loginUser(dto: UserLoginDTO): Promise<AuthUserResponce> {
      const existUser = await this.usersService.findUserByEmail(dto.userEmail);
      if (!existUser)
         throw new BadRequestException(AppError.USER_NOT_EXIST_EMAIL);
      const validatePassword = await bcrypt.compare(
         dto.userPassword,
         existUser.userPassword
      );
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
      const userDATA = {
         userName: existUser.userName,
         userEmail: existUser.userEmail,
      };
      const token = await this.tokenService.generateJwtToken(userDATA);
      const responceData = await this.usersService.publicUser(dto.userEmail);
      return { ...responceData, token };
      // возвращает новый объект с полным содержимым user
      // и дополнительным свойством token.
   }
}
