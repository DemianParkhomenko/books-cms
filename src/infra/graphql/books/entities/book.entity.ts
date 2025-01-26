import { Field, ObjectType, GraphQLISODateTime, ID } from '@nestjs/graphql';

@ObjectType('Book', { description: 'Represents a book in the system' })
export class Book {
  @Field({ description: 'Author ID of the book' })
  authorId: string;

  @Field(() => ID, { description: 'The unique ID of the book' })
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: 'The publication date of the book',
  })
  publicationDate: Date;

  @Field({ description: 'The title of the book' })
  title: string;
}

@ObjectType('Books', {
  description: 'A list of books and the pagination cursor for the next page',
})
export class Books {
  @Field(() => [Book], { description: 'The list of books' })
  node: Book[];

  @Field({
    description: 'The cursor to fetch the next set of books in pagination',
  })
  nextCursor: string;
}
