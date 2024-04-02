import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountabilityDto } from './create-accountability.dto';

export class UpdateAccountabilityDto extends PartialType(CreateAccountabilityDto) {}
