import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new ResponseInterceptor());
    // 支持跨域请求
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            disableErrorMessages: false,
            whitelist: true,
        })
    );

    await app.listen(3000);
}

bootstrap();
