import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as config from "config";
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MCA Application');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: serverConfig.origin
    });
    logger.log(`Accepting requests from origin ${serverConfig.origin}`);
  }

  const options = new DocumentBuilder()
    .setTitle('MCA')
    .setDescription('Martins Children Academy REST API list')
    .setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application is running on port: ${port}`);
}
bootstrap();
