import {
  Controller, Get,
  InternalServerErrorException,
  Delete, Post,
  Body, UseGuards,
  Request,
  Patch,
  Param,
  NotFoundException,
  Put,
  Render,
  Res,
  Redirect,
  Req,
  NotAcceptableException
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SigninDto } from './dto/signin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from './user.interface';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Sign } from 'crypto';
import { UserValidator } from '../common/validator/user-validator';

@Controller('/auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get('/signup')
  @Render('auth/signup')
  async signup(): Promise<any> {
    return { active: 'signup' }
  }

  @Post('/register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() body: any, @Res() response: any, @Req() request: any) {
    const toValidate: string[] = ['name', 'email', 'password', 'confirmPassword'];
    const errors: string[] = UserValidator.validate(body, toValidate);
    if (errors.length > 0) {
      request.session.flashErrors = errors;
      return response.redirect('/auth/signup');
    } else {
      try {
        const newUser = new CreateUserDto();
        newUser.setName(body.name);
        newUser.setEmail(body.email);
        newUser.setPassword(body.password);
        newUser.setPasswordConfirmation(body.confirmPassword);
        await this.usersService.create(newUser);
        request.session.flashSuccess = ['User created successfully']
        return response.redirect('/auth/login');

      } catch (error) {
        request.session.flashErrors = [error.response.message];
        console.log('error', error);
        return response.redirect('/auth/signup')
      }
    }
  }

  @Get('/login')
  @Render('auth/login')
  async signin(): Promise<any> {
    return { active: 'login' }
  }

  @Post('/connect')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async connect(@Body() body: SigninDto, @Req() request, @Res() response) {
    try {
      const user = await this.usersService.validateUser(body);
      if (user) {
        request.session.user = {
          id: user.getId(),
          name: user.getName(),
        };
        request.session.flashSuccess = ['Successfully logged in!'];
        return response.redirect('/');
      } else {
        return response.redirect('/login');
      }
    } catch (error) {
      request.session.flashErrors = [error.response.message];
      return response.redirect('/auth/login');
    }
  }

  @Get('/logout')
  @Redirect('/')
  logout(@Req() request) {
    request.session.user = null;
  }

  @Get('get/:id')
  async getUser(@Param() params, @Res() response) {
    const user = await this.usersService.get(params.id);
    return response.render('signup', { user });
  }

  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, user: UserEntity): Promise<any> {
    const data = await this.usersService.update(id, updateUserDto, user);
    return { message: 'User updated', data }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@Request() request: IRequest): Promise<any> {
    return request.user;
  }
}