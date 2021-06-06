import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { WatchModule } from '../watch/watch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), WatchModule],
  providers: [CartService, CartResolver],
  exports: [CartService]
})
export class CartModule {}
