import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateCardDTO {
   @ApiProperty()
   @IsString()
   cardName: string;

   @ApiProperty()
   @IsString()
   cardDescription: string;

   @ApiProperty()
   @IsNumber()
   columnId: number;

   @ApiProperty()
   @IsNumber()
   userId: number;
}

export class UpdateCardDTO {
   @ApiProperty()
   @IsNumber()
   id: number;

   @ApiProperty()
   @IsString()
   cardName: string;

   @ApiProperty()
   @IsString()
   cardDescription: string;

   @ApiProperty()
   @IsBoolean()
   isCompleted: boolean;

   @ApiProperty()
   @IsNumber()
   columnId: number;

   @ApiProperty()
   @IsNumber()
   userId: number;
}

export class IdCardDTO {
   @ApiProperty()
   @IsNumber()
   id: number;
}
