import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      create(details: UserDTO): Promise<User> {
        return this.userRepository.save(details);
      }
    
      findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id);
      }
}
