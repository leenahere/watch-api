import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ObjectType, Field } from '@nestjs/graphql';
  
  @ObjectType()
  @Entity()
  export class User {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Field()
    @Column({ nullable: false })
    name: string;  
  }