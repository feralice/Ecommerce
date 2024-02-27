import { AuthService } from "@/modules/auth/service/auth.service";
import { AuthController } from "@/modules/auth/auth.controller";
import { UserModule } from "@/modules/user/user.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1d" },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
