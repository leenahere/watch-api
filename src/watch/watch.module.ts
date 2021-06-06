import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountModule } from '../discount/discount.module';
import { Watch } from './watch.entity';
import { WatchResolver } from './watch.resolver';
import { WatchService } from './watch.service';

@Module({
  imports: [
    forwardRef(() => DiscountModule),
    TypeOrmModule.forFeature([Watch]),
  ],
  providers: [WatchResolver, WatchService],
  exports: [WatchService]
})
export class WatchModule {}
