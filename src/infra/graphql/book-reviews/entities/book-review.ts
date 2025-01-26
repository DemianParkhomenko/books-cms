import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class BookReview {
  @Field(() => String)
  bookId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Int)
  rating: number;

  @Field(() => String)
  comment: string;
}
