import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as config from "config";
import { Logger } from '@nestjs/common';
import * as fs from "fs";
import * as express from "express";
import * as http from "http";
import * as https from "https";
import { ExpressAdapter } from "@nestjs/platform-express";

async function bootstrap() {
  const serverConfig = config.get('server');
  const server = express();
  const port = process.env.PORT || serverConfig.port;
  const logger = new Logger('MCA Application');
  let app;

  if (process.env.NODE_ENV === 'production') {
    const httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/martinschildrenacademy.com/privkey.pem', 'utf8'),
      cert: fs.readFileSync('/etc/letsencrypt/live/martinschildrenacademy.com/cert.pem', 'utf8'),
      ca: fs.readFileSync('/etc/letsencrypt/live/martinschildrenacademy.com/chain.pem', 'utf8')
    };
    app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors({
      origin: serverConfig.origin
    });
    swaggerInitialization(app);
    logger.log(`Production: Accepting requests from origin ${serverConfig.origin}`);
    await app.init();
    https.createServer(httpsOptions, server).listen(port);
    http.createServer(function(req, res) {
      res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
      res.end();
    }).listen(port);
    logger.log(`Application is running on port: ${port}`);
  } else {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    swaggerInitialization(app);
    logger.log(`Development Environment is Working`);
    await app.listen(port);
    logger.log(`Application is running on port: ${port}`);
  }
}

function swaggerInitialization(app) {
  const options = new DocumentBuilder()
    .setTitle('MCA')
    .setDescription('Martins Children Academy REST API list')
    .setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
