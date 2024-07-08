import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUserDTO {
   @ApiProperty()
   @IsString()
   userName: string;

   @ApiProperty()
   @IsString()
   userEmail: string;

   @ApiProperty()
   @IsString()
   userPassword: string;
}

export class UpdateUserDTO {
   @ApiProperty()
   @IsNumber()
   id: number;

   @ApiProperty()
   @IsString()
   userName: string;

   @ApiProperty()
   @IsString()
   userEmail: string;
}

export class IdUserDTO {
   @ApiProperty()
   @IsNumber()
   id: number;
}
