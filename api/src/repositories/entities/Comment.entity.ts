import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './Transaction.entity';
import { User } from './User.entity';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.comments)
    transaction: Transaction;

    @Field()
    text: string;

    @ManyToOne(() => User, (user) => user.comments)
    author: User;
}
