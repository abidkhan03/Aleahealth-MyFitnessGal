import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Controller, Get, HttpStatus, Param, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from '../user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService) { }

  @Get('/')
  @Render('index')
  index() {
    return { active: 'home'}
  }

  @Get('/about')
  @Render('about-info')
  about() { 
    return { active: 'about'}
  }
}
