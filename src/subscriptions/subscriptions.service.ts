import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    try {
      const response = await this.subscriptionRepository.save(
        new Subscription(createSubscriptionDto),
      );
      console.log(JSON.stringify(response));
    } catch (e) {
      console.error(e);
    }
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
