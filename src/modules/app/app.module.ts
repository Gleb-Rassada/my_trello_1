import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "../users/users.module";
import configurations from "../../configurations";
import { Users } from "../../models/users.model";
import { AuthModule } from "../auth/auth.module";
import { TokenModule } from "../token/token.module";
import { Columns } from "src/models/columns.model";
import { Cards } from "src/models/cards.model";
import { Comments } from "src/models/comments.model";
import { CardsModule } from "../cards/cards.module";
import { ColumnsModule } from "../columns/columns.module";
import { CommentsModule } from "../comments/comments.module";
// App.module - модуль root, как я понял именно по этому в конечном итоге
// все используемые модули должны быть импортированны сюда
@Module({
   controllers: [AppController],
   providers: [AppService], // под провайдером может подразумеваться любой переиспользуемый
   // компонент приложения(всё что содержит логику и может
   // использоваться в другихх частях приложения)
   imports: [
      ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
      //импортировал Sequelize модуль в отором указал конфигурацию БД
      SequelizeModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: (configService: ConfigService) => ({
            dialect: "postgres",
            host: configService.get("db_host"),
            port: configService.get("db_port"),
            username: configService.get("db_user"),
            password: configService.get("db_password"),
            database: configService.get("db_name"),
            synchronize: true,
            models: [Users, Columns, Cards, Comments], // перечень всех моделей
            autoLoadModels: true,
         }),
      }),
      UsersModule,
      AuthModule,
      TokenModule,
      ColumnsModule,
      CardsModule,
      CommentsModule,
   ],
})
export class AppModule {}
