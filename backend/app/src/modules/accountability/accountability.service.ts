import { Injectable } from '@nestjs/common';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';

@Injectable()
export class AccountabilityService {
  create(createAccountabilityDto: CreateAccountabilityDto) {
    return 'This action adds a new accountability';
  }

  findAll() {
    return `This action returns all accountability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountability`;
  }

  update(id: number, updateAccountabilityDto: UpdateAccountabilityDto) {
    return `This action updates a #${id} accountability`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountability`;
  }
}
