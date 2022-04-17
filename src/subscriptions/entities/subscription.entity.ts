import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { DateTime } from 'luxon';
import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';

@Entity('subscriptions')
export class Subscription {
  constructor(subscriptionDTO?: UpdateSubscriptionDto | CreateSubscriptionDto) {
    this.userId = subscriptionDTO?.userId;
    this.active = subscriptionDTO?.active ?? true;
    this.createDate =
      subscriptionDTO?.createDate ?? DateTime.now().toUTC().toUnixInteger();
    if (subscriptionDTO && subscriptionDTO instanceof UpdateSubscriptionDto) {
      this.lastBilledAt = subscriptionDTO?.lastBilledAt;
      this.id = subscriptionDTO?.id;
    }
  }

  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  userId: ObjectID;

  @ObjectIdColumn()
  price: number;

  @Column()
  createDate: number;

  @Column()
  lastBilledAt: number;

  @Column()
  active: boolean;
}
