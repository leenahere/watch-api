import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ChildEntity, OneToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Cart {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => [String])
    @Column("text", { array: true })
    items: string[];

    @Field()
    @Column()
    total: number;

    @Field(type => User)
    @Column()
    userId: string;

    @OneToOne(() => User)
    @JoinColumn({name: "userId"})
    user: User;
}