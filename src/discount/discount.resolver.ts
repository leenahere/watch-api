import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Discount } from './discount.entity';
import { DiscountService } from './discount.service';

@Resolver()
export class DiscountResolver {
    constructor(
        @Inject(DiscountService) private discountService: DiscountService,
      ) { }

    @Query(returns => Discount)
    async discount(@Args('id') id: string): Promise<Discount> {
      return await this.discountService.findOne(id);
    }
  
    @Query(returns => [Discount])
    async discounts(): Promise<Discount[]> {
      return await this.discountService.findAll();
    }
  
    @Mutation(returns => Discount)
    async createDiscount(
      @Args('quantity') quantity: number,
      @Args('price') price: number,
    ): Promise<Discount> {
      return await this.discountService.create({ quantity, price })
    }
}
