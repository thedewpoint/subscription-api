import { ObjectID } from 'typeorm';
export class CreateSubscriptionDto {
  userId: ObjectID;
  createDate: number;
  active: boolean;
}
