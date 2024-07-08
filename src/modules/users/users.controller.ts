import {
   Body,
   Controller,
   Delete,
   Get,
   Patch,
   UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { IdUserDTO, UpdateUserDTO } from "./dto";
import { JwtAuthGuard } from "src/guards/jwt-guard";

@Controller("users")
export class UsersController {
   constructor(private readonly userService: UsersService) {}

   @Get()
   getAll() {
      return this.userService.getAllUsers();
   }

   @UseGuards(JwtAuthGuard)
   @Get("id")
   getOne(@Body() dto: IdUserDTO) {
      return this.userService.getOneUser(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Patch() //                             в Promise пишем, какие даные попадут на frontend
   update(@Body() updateDto: UpdateUserDTO): Promise<UpdateUserDTO> {
      return this.userService.updateUser(updateDto.id, updateDto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete()
   delete(@Body() dto: IdUserDTO) {
      return this.userService.deleteUser(dto);
   }
}
