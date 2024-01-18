import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["env/local.env"],
    }),
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
