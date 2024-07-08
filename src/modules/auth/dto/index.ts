import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserLoginDTO {
   @ApiProperty()
   @IsString()
   userEmail: string;
   @ApiProperty()
   @IsString()
   userPassword: string;
}
