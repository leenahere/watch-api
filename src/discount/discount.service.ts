import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountDTO } from './discount.dto';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private discountRepository: Repository<Discount>,
      ) {}
    
      create(details: DiscountDTO): Promise<Discount> {
        return this.discountRepository.save(details);
      }
    
      findAll(): Promise<Discount[]> {
        return this.discountRepository.find();
      }
    
      findOne(id: string): Promise<Discount> {
        return this.discountRepository.findOne(id);
      }
}
