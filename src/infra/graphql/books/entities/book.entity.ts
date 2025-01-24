import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field()
  authorId: string;

  @Field({ nullable: true })
  id?: string;

  @Field(() => Int)
  publicizedAt: number;

  @Field()
  title: string;
}
