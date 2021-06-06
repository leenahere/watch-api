import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Discount } from '../discount/discount.entity';

@ObjectType()
@Entity()
export class Watch {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  price: number;

  @Field(type => Discount, { nullable: true })
  @Column({nullable: true})
  discountId: string;

  @OneToOne(() => Discount, {eager: true, nullable: true})
  @JoinColumn({name: "discountId"})
  discount: Discount;
}
