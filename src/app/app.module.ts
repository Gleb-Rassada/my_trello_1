import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "../user/user.module";
// App.module - модуль root, как я понял именно по этому в конечном итоге
// все используемые модули должны быть импортированны сюда
@Module({
   controllers: [AppController],
   providers: [AppService], // под провайдером может подразумеваться любой переиспользуемый
   // компонент приложения(всё что содержит логику и может
   // использоваться в другихх частях приложения)
   imports: [
      ConfigModule.forRoot({
         envFilePath: `.${process.env.NODE_ENV}.env`,
      }),
      //импортировал Sequelize модуль в отором указал конфигурацию БД
      SequelizeModule.forRoot({
         dialect: "postgres",
         host: process.env.POSTGRES_HOST,
         port: Number(process.env.POSTGRES_PORT), // порт postgres поумолчанию
         username: process.env.POSTGRES_USER,
         password: process.env.POSTGRES_PASSWORD,
         database: process.env.POSTGRES_DB,
         models: [],
         autoLoadModels: true,
      }),
      UserModule,
   ],
})
export class AppModule {}
