import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { RabbitMQModule, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'subscription-exchange',
          type: 'x-delayed-message',
          options: { arguments: { 'x-delayed-type': 'topic' } },
        },
      ],
      uri: 'amqp://user:bitnami@localhost:5672',
      // channels: {
      //   'channel-1': {
      //     prefetchCount: 15,
      //     default: true,
      //   },
      //   'channel-2': {
      //     prefetchCount: 2,
      //   },
      // },
    }),
  ],
})
export class SubscriptionsModule {}
