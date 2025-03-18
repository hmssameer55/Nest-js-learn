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
      forbidNonWhitelisted: true, //adding this will throw an error if unnecessary attr are passed by client
      transform: true, // Converts incoming request data into class instances of DTOs.
      transformOptions: {
        enableImplicitConversion: true, //Automatically converts request values (e.g., query params) to the expected DTO type without requiring @Type(() => Type).
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// 1️⃣ When to Use transform: ?
// By default, NestJS receives request data as plain JavaScript objects, not class instances.
// When transform: true is set:

// The incoming request data is automatically converted into instances of the specified DTO class.
// This means class-validator can properly apply validation rules to the transformed objects.

// 🔴 Real-World Scenario Where Validation Fails
// Let's consider a DTO that requires age to be a number.

// 🚀 Example: DTO with Validation
// import { IsNumber, IsString } from 'class-validator';

// export class CreateUserDto {
//   @IsString()
//   name: string;

//   @IsNumber()
//   age: number;
// }

// Scenario 1: transform: false
// Incoming JSON request:
// {
//   "name": "John",
//   "age": "25"
// }

// Controller
// @Post()
// createUser(@Body() data: CreateUserDto) {
//   console.log(typeof data.age); // ❌ Still a string when transform: false
// }

// Since transform is disabled, age is not converted to a number.
// IsNumber() fails because "25" is a string, not a number.
// Error:
// {
//   "message": ["age must be a number"],
//   "error": "Bad Request",
//   "statusCode": 400
// }

// Scenario 2: transform: true (Fixing the Issue)
// With transform: true, the same JSON request:

// {
//   "name": "John",
//   "age": "25"
// }
// Now, the DTO is instantiated properly.

// Controller
// @Post()
// createUser(@Body() data: CreateUserDto) {
//   console.log(typeof data.age); // ✅ Now it's a number
// }
// age is converted from "25" (string) → 25 (number).
// Validation passes successfully.

// 🚀 Conclusion:
// Always use transform: true unless you have a specific reason to disable it.

//2️⃣ How Does Implicit Conversion Work in NestJS?
// When you enable enableImplicitConversion: true in ValidationPipe, NestJS automatically converts incoming data types based on the DTO properties.

// Implicit conversion is based on:

// The TypeScript type of the DTO property (e.g., number, boolean, Date).
// The metadata of the DTO property (inferred from decorators like @IsInt(), @IsBoolean()).
// NestJS’s internal handling of basic types (e.g., string → number, "true" → true).
