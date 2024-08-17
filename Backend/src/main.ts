import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors();

  // Alternatively, enable CORS with specific settings
  // app.enableCors({
  //   origin: 'http://localhost:5173', // Allow only this origin
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });

  await app.listen(3309); // Ensure this matches your backend port
}
bootstrap();









// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3309);
// }
// bootstrap();