import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { DateTime } from 'luxon';
@Injectable()
export class SubscriptionsService {
  // readonly RENEWAL_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days
  readonly RENEWAL_TIME = 1000 * 60 * 2; // 2 minutes
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    private readonly amqpConnection: AmqpConnection,
  ) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    try {
      const response = await this.subscriptionRepository.save(
        new Subscription(createSubscriptionDto),
      );
      console.log(`publishing subscription on  ${DateTime.now().toUTC()}`);
      this.amqpConnection.publish(
        'subscription-exchange',
        'subscription-charge',
        {
          subscriptionId: response.id,
        },
        {
          headers: {
            'x-delay': 0,
          },
        },
      );
    } catch (e) {
      console.error(e);
    }
  }
  @RabbitSubscribe({
    exchange: 'subscription-exchange',
    routingKey: 'subscription-charge',
    queue: 'subscription-charge-queue',
  })
  public async processSubscription(msg: any) {
    const lastBilledAt = DateTime.now().toUTC().toUnixInteger();
    console.log(
      `processing subscription with id ${
        msg.subscriptionId
      } on ${DateTime.now().toUTC()}`,
    );
    // console.log(JSON.stringify(msg));
    this.amqpConnection.publish(
      'subscription-exchange',
      'subscription-charge',
      {
        subscriptionId: msg.subscriptionId,
      },
      {
        headers: {
          'x-delay': this.RENEWAL_TIME,
        },
      },
    );
  }

  findAll() {
    return `This action returns all subscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
