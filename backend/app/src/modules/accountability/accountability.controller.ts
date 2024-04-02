import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountabilityService } from './accountability.service';
import { CreateAccountabilityDto } from './dto/create-accountability.dto';
import { UpdateAccountabilityDto } from './dto/update-accountability.dto';

@Controller('accountability')
export class AccountabilityController {
  constructor(private readonly accountabilityService: AccountabilityService) {}

  @Post()
  create(@Body() createAccountabilityDto: CreateAccountabilityDto) {
    return this.accountabilityService.create(createAccountabilityDto);
  }

  @Get()
  findAll() {
    return this.accountabilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountabilityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountabilityDto: UpdateAccountabilityDto) {
    return this.accountabilityService.update(+id, updateAccountabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountabilityService.remove(+id);
  }
}
