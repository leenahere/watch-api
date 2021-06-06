import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Watch } from './watch.entity';
import { WatchService } from './watch.service';

@Resolver()
export class WatchResolver {
    constructor(
        @Inject(WatchService) private watchService: WatchService,
      ) { }

    @Query(returns => Watch)
    async watch(@Args('id') id: string): Promise<Watch> {
      return await this.watchService.findOne(id);
    }
  
    @Query(returns => [Watch])
    async watches(): Promise<Watch[]> {
      return await this.watchService.findAll();
    }
  
    @Mutation(returns => Watch)
    async createWatch(
      @Args('name') name: string,
      @Args('price') price: number,
      @Args('discountId') discountId?: string 
    ): Promise<Watch> {

      return await this.watchService.create({ name, price, discountId })
    }
}
