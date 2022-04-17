import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { ObjectID } from 'typeorm';
export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
  id: ObjectID;
  lastBilledAt: number;
}
