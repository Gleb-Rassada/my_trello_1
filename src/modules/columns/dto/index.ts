import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateColumnDTO {
   @ApiProperty()
   @IsString()
   columnName: string;
   @ApiProperty()
   @IsNumber()
   userId: number;
}

export class UpdateColumnDTO {
   @ApiProperty()
   @IsNumber()
   id: number;

   @ApiProperty()
   @IsString()
   columnName: string;

   @ApiProperty()
   @IsNumber()
   userId: number;
}

export class IdColumnDTO {
   @ApiProperty()
   @IsNumber()
   id: number;
}
