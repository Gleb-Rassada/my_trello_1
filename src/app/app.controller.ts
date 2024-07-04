import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
// контроллер используем как маршрутизатор
//

@Controller("/api") // в скобочках пишем путь
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get("/hello")
   getUsers() {
      return this.appService.getHelloTrello();
   }
}
