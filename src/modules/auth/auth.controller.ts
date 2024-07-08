import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../users/dto";
import { UserLoginDTO } from "./dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthUserResponce } from "./responce";
// import { JwtAuthGuard } from "src/guards/jwt-guard";

@Controller("auth")
export class AuthController {
   constructor(private readonly authService: AuthService) {}
   @ApiTags("Auth")
   @ApiResponse({ status: 201, type: CreateUserDTO })
   //описание возвращаемого ответа при успешном выполнении
   @Post("register")
   register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
      return this.authService.registerUser(dto);
   }

   @ApiTags("Auth") // для swagger
   @ApiResponse({ status: 200, type: UserLoginDTO })
   @Post("login")
   login(@Body() dto: UserLoginDTO): Promise<AuthUserResponce> {
      return this.authService.loginUser(dto);
   }

   // тест работы jwt токена
   // @UseGuards(JwtAuthGuard)
   // @Post("test")
   // test() {
   //    return true;
   // }
}
