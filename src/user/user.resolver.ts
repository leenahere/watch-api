import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Mutation((returns) => User)
  async createUser(@Args('name') name: string): Promise<User> {
    return await this.userService.create({ name });
  }
}
