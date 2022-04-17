import { ObjectID } from 'typeorm';
export class CreateSubscriptionDto {
  userId: ObjectID;
  planId: ObjectID;
  createDate: number;
  active: boolean;
}
