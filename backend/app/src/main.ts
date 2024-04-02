import 'source-map-support/register';
import 'reflect-metadata';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '@app/modules/main/app.module';
import { setupSwagger } from '@app/swagger';
import { TrimStringsPipe } from '@app/modules/common/transformer/trim-strings.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as session from 'express-session';

declare const module: any;

const APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(
    new TrimStringsPipe(),
    new ValidationPipe({ whitelist: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', '..', 'views/layouts'));
  hbs.registerHelper('eq', (arg1: any, arg2: any) => arg1 === arg2);
  app.use(
    session({
      secret: 'nest-fitness',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(function (req: any, res: any, next: any) {
    res.locals.session = req.session;
    // handling error messages
    // const flashErrors: string[] = req.session.flashErrors;
    // if (flashErrors) {
    //   res.locals.flashErrors = flashErrors;
    //   req.session.flashErrors = null;
    // }
    if (req.session.flashErrors) {
      res.locals.flashErrors = req.session.flashErrors;
      req.session.flashErrors = null;
    }
    // Handling success messages
    if (req.session.flashSuccess) {
      res.locals.flashSuccess = req.session.flashSuccess;
      req.session.flashSuccess = null;
    }
    next();
  });

  await app.listen(APP_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();