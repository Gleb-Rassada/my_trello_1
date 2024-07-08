import {
   Body,
   Controller,
   Delete,
   Get,
   Patch,
   UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO, IdUserDTO, UpdateUserDTO } from "./dto";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
   constructor(private readonly userService: UsersService) {}

   @ApiTags("Users")
   @ApiResponse({ status: 200, type: CreateUserDTO })
   @Get()
   getAll() {
      return this.userService.getAllUsers();
   }

   @ApiTags("Users")
   @ApiResponse({ status: 200, type: UpdateUserDTO })
   @UseGuards(JwtAuthGuard)
   @Get(":id")
   getOne(@Body() dto: IdUserDTO) {
      return this.userService.getOneUser(dto);
   }

   @ApiTags("Users")
   @ApiResponse({ status: 200, type: UpdateUserDTO })
   @UseGuards(JwtAuthGuard)
   @Patch(":id")
   update(@Body() updateDto: UpdateUserDTO): Promise<UpdateUserDTO> {
      return this.userService.updateUser(updateDto.id, updateDto);
   }

   @ApiTags("Users")
   @ApiResponse({ status: 200, type: "Deleted" })
   @UseGuards(JwtAuthGuard)
   @Delete(":id")
   delete(@Body() dto: IdUserDTO) {
      return this.userService.deleteUser(dto);
   }
}
