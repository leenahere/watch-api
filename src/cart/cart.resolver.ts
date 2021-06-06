import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Resolver()
export class CartResolver {
  constructor(@Inject(CartService) private cartService: CartService) {}

  @Query((returns) => Cart)
  async cart(@Args('id') id: string): Promise<Cart> {
    return await this.cartService.findOne(id);
  }

  @Query(returns => [Cart])
  async carts(): Promise<Cart[]> {
    return await this.cartService.findAll();
  }

  @Mutation((returns) => Cart)
  async createCart(
    @Args({ name: 'items', type: () => [String] }) items: string[],
    @Args('total') total: number,
    @Args('userId') userId: string,
  ): Promise<Cart> {
    return await this.cartService.create({ items, total, userId });
  }

  @Mutation((returns) => Cart)
  async addCartItem(
    @Args('id') id: string,
    @Args('newItem') newItem: string,
  ): Promise<Cart> {
    return await this.cartService.addCartItem(id, newItem);
  }
}
