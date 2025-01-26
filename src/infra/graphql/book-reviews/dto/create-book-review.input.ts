import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookReviewInput {
  @Field()
  bookId: string;

  @Field()
  userId: string;

  @Field(() => Int)
  rating: number;

  @Field()
  comment: string;
}
