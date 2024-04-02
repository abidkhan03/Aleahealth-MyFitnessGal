import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { SameAs } from '@modules/common/validator/same-as-validator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto extends UserEntity{
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiProperty({ required: true })
  @SameAs('password')
  passwordConfirmation: string;

  getId(): any {
    return this.userId;
  }

  setId(id: number) {
    this.userId = id;
  }

  getName(): string {
    return this.fullName;
  }

  setName(name: string) {
    this.fullName = name;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) { 
    this.password = password;
  }

  getPasswordConfirmation(): string {
    return this.passwordConfirmation;
  }

  setPasswordConfirmation(passwordConfirmation: string) {
    this.passwordConfirmation = passwordConfirmation;
  }
}