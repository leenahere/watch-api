import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchService } from '../watch/watch.service';
import { Repository } from 'typeorm';
import { CartDTO } from './cart.dto';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private readonly watchService: WatchService,
  ) {}

  create(details: CartDTO): Promise<Cart> {
    return this.cartRepository.save(details);
  }

  findOne(id: string): Promise<Cart> {
    return this.cartRepository.findOne(id);
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  /**
   * Adds an item to an existent cart
   * Invokes recalculation of total
   * Updates cart respectively
   * @param cartId 
   * @param newItem 
   * @returns Cart
   */
  async addCartItem(cartId: string, newItem: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne(cartId);
    cart.items.push(newItem);
    cart.total = await this.calculateTotal(cart.items);
    return this.cartRepository.save(cart);
  }

  /**
   * Calculates a cart total from a list of cart items
   * First uses reduce to count quantity of each item
   * Then checks forfor each item
   * Applies discount rule through division + modulo
   * If no discount rule for item existent simple multiplication of quantity
   * @param cartItems 
   * @returns number
   */
  async calculateTotal(cartItems: string[]): Promise<number> {
    const quantities = cartItems.reduce(
      (accumulator, watchId) => accumulator.set(watchId, (accumulator.get(watchId) || 0) + 1),
      new Map(),
    );
    let newTotal = 0;
    for (const [id, quantity] of quantities) {
      const watch = await this.watchService.findOne(id);
      if (watch.discount) {
        const bulk = Math.floor(quantity / watch.discount.quantity);
        const remainder = quantity % watch.discount.quantity;
        newTotal += bulk * watch.discount.price + remainder * watch.price;
      } else {
        newTotal += quantity * watch.price;
      }
    }
    return newTotal;
  }
}
