import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TO enable CORS for your Next.js frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://10.224.232.136:3000',
      'https://unhemmed-semioratorically-elli.ngrok-free.dev',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3010);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 3010}`);
}
bootstrap();
