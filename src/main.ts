import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function start() {
   const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);
   // теперь можем обращаться ко всем методам в конфиг сервисе
   const port = configService.get("PORT");
   // валидация
   app.useGlobalPipes(new ValidationPipe());

   const config = new DocumentBuilder() // объект базового документа конфигурации
      .setTitle("Trello api") // заголовок страницы
      .setDescription("This API for interaction with Trello") // описание
      .setVersion("") // версия нашего api
      .addTag("API") //
      .build(); //

   // теперь создаём полный документ который будет описывать
   // приложение и будет принимать в себя конфигурацию
   const document = SwaggerModule.createDocument(app, config);
   // http://localhost:5000/api/docs
   SwaggerModule.setup("api/docs", app, document);
   await app.listen(port, () =>
      console.log("SERVER STARTED ON PORT = " + port)
   );
}

start();
