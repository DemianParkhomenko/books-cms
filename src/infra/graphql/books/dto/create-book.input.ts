import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  authorId: string;

  @Field(() => GraphQLISODateTime)
  publicationDate: Date;

  @Field()
  @Length(2, 30)
  title: string;
}
