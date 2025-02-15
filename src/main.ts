import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

// 加载env文件
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // 启用全局校验管道
   app.useGlobalPipes(
    new ValidationPipe({
      transform: true,  // 自动转换请求数据类型，确保 DTO 中的字段类型正确
      whitelist: true,  // 去除未在 DTO 中声明的字段，避免接收到额外的请求数据
    })
  );

  // 启用全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())

  // 启用全局错误过滤器
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.PORT ?? 5666);
}
bootstrap();
