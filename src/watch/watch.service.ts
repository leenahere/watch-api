import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchDTO } from './watch.dto';
import { Watch } from './watch.entity';

@Injectable()
export class WatchService {
  constructor(
    @InjectRepository(Watch)
    private watchRepository: Repository<Watch>,
  ) {}

  create(details: WatchDTO): Promise<Watch> {
    return this.watchRepository.save(details);
  }

  findAll(): Promise<Watch[]> {
    return this.watchRepository.find();
  }

  findOne(id: string): Promise<Watch> {
    return this.watchRepository.findOne(id, { relations: ["discount"]});
  }
}
