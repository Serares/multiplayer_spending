import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Category {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    name!: string;

    @Field()
    colorCode: string;

}
