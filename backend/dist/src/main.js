import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'http://10.116.233.136:3000'],
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(process.env.PORT ?? 3010);
    console.log(`Server running on http://localhost:${process.env.PORT ?? 3010}`);
}
bootstrap();
//# sourceMappingURL=main.js.map