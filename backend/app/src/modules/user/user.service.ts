import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Hash } from '../utils/hash.util';
import { SigninDto } from './dto/signin-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async get(userId: number) {
    return this.userRepository.findOne({
      where: { userId },
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async create(signupDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.getByEmail(signupDto.email);
    if (userExists) {
      throw new NotAcceptableException('Provided Email already exists!');
    }
    if (signupDto.password !== signupDto.passwordConfirmation) {
      throw new NotAcceptableException('Passwords do not match!');
    }
    return await this.userRepository.save(
      this.userRepository.create(signupDto),
    );
  }

  async update(userId: number, updateUserDto: UpdateUserDto, userEntity?: UserEntity) {
    const user = await this.userRepository.findOne({ where: { userId } });
    const editUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(editUser);
  }

  async createToken(user: UserEntity) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.userId }),
      user,
    };
  }

  async validateUser(signinDto: SigninDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: signinDto.email },
    });
    if (!user || !Hash.compare(signinDto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }
}
