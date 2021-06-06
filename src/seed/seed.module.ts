import { Module } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { DiscountModule } from '../discount/discount.module';
import { UserModule } from '../user/user.module';
import { WatchModule } from '../watch/watch.module';
import { SeedResolver } from './seed.resolver';

@Module({
  imports: [CartModule, UserModule, WatchModule, DiscountModule],
  providers: [SeedResolver]
})
export class SeedModule {}
