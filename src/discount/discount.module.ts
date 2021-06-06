import { forwardRef, Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountResolver } from './discount.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { WatchModule } from '../watch/watch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Discount]), forwardRef(() => WatchModule)],
  providers: [DiscountService, DiscountResolver],
  exports: [DiscountService]
})
export class DiscountModule {}
