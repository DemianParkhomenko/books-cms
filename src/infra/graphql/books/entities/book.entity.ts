import { Field, ObjectType, GraphQLISODateTime, ID } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field()
  authorId: string;

  @Field(() => ID)
  id: number;

  @Field(() => GraphQLISODateTime)
  publicationDate: Date;

  @Field()
  title: string;
}

@ObjectType()
export class Books {
  @Field(() => [Book])
  node: Book[];

  @Field()
  nextCursor: string;
}
