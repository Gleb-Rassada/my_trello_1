import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthUserResponce {
   @ApiProperty() // документируем данные, которые сервер возвращает
   @IsString()
   userName: string;

   @ApiProperty()
   @IsString()
   userEmail: string;

   // не возвращаю пароль на frontend
   // @ApiProperty()
   // @IsString()
   // userPassword: string;

   @ApiProperty()
   @IsString()
   token: string;
}
