import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCommentDTO {
   @ApiProperty()
   @IsString()
   commentContent: string;

   @ApiProperty()
   @IsNumber()
   cardId: number;

   @ApiProperty()
   @IsNumber()
   userId: number;
}

export class UpdateCommentDTO {
   @ApiProperty()
   @IsNumber()
   id: number;

   @ApiProperty()
   @IsString()
   commentContent: string;

   @ApiProperty()
   @IsNumber()
   cardId: number;

   @ApiProperty()
   @IsNumber()
   userId: number;
}

export class IdCommentDTO {
   @ApiProperty()
   @IsNumber()
   id: number;
}
