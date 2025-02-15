import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { JwtAuthMiddleware } from './common/middlewares/jwt.middleware';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      // 排除 /auth 路径及其下所有子路径
      .exclude(
        { path: 'auth', method: RequestMethod.ALL }, 
        { path: 'auth/*path', method: RequestMethod.ALL }, 
      )
      .forRoutes('*');  // 应用到所有其他路由
  }
}
