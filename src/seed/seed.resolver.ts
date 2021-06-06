import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CartService } from 'src/cart/cart.service';
import { DiscountService } from 'src/discount/discount.service';
import { UserService } from 'src/user/user.service';
import { WatchService } from '../watch/watch.service';

@Resolver()
export class SeedResolver {
  constructor(
    @Inject(CartService) private cartService: CartService,
    @Inject(UserService) private userService: UserService,
    @Inject(DiscountService) private discountService: DiscountService,
    @Inject(WatchService) private watchService: WatchService,
  ) {}

  @Query(returns => Boolean)
  async seed(): Promise<boolean> {
    const user = await this.userService.create({ name: 'Rich the Rolex Guy' });
    const cart = await this.cartService.create({
      userId: user.id,
      total: 0,
      items: [],
    });
    const discountRolex = await this.discountService.create({
      quantity: 3,
      price: 200,
    });
    const discountMichaelKors = await this.discountService.create({
      quantity: 2,
      price: 120,
    });

    const rolexWatch = await this.watchService.create({
      name: 'Rolex',
      price: 100,
      discountId: discountRolex.id,
    });
    const michaelKorsWatch = await this.watchService.create({
      name: 'Michael Kors',
      price: 80,
      discountId: discountMichaelKors.id,
    });
    const swatchWatch = await this.watchService.create({
      name: 'Swatch',
      price: 50,
    });
    const casioWatch = await this.watchService.create({
      name: 'Casio',
      price: 30,
    });

    return true;
  }
}
