import { Injectable } from "@nestjs/common";

//Чтобы класс стал провайдером,
//необходимо пометить его аннотацией @Injectable
// поскольку в дальнейшем будем внедрять этот сервис в контроллер
@Injectable()
export class AppService {
   getHelloTrello() {
      return "My Trello started";
   }
}

// в сервисах пишем основную логику, затем внедряем её в контроллеры
