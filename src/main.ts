import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('My first project with NestJS')
    .setDescription('The API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local server')
    .addServer('https://api.example.com', 'Production server')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //adding whitelist will ensure only predefined attr in dtos are passed to controller and any extra attr from client will be stripped away
      forbidNonWhitelisted: true, //adding this will throw an error in unnecessary attr are passed by client
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
