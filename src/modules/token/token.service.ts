import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
   ) {}

   // метод принимает данные о пользователе
   async generateJwtToken(user) {
      const payload = { user };
      // принимает 2 параметра payload
      // и options - закрытый ключ и время жизни токена
      return this.jwtService.sign(payload, {
         secret: this.configService.get("jwt_secret"),
         expiresIn: this.configService.get("expire_jwt"),
      });
   }
}
