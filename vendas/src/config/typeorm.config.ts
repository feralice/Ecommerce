import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
  envFilePath: ["env/local.env"],
});

const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  entities: ["dist/**/*.entity{ .ts,.js}"],
  synchronize: false,
  migrations: ["dist/migration/*{.ts,.js}"],
  migrationsRun: true,
};

export default typeOrmConfig;
