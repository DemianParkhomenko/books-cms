import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
import { registerEnumType } from '@nestjs/graphql';

export enum SortField {
  TITLE = 'title',
  PUBLICATION_DATE = 'publicationDate',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortField, {
  name: 'SortField',
  description: 'The field by which to sort',
});

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'The direction in which to sort',
});

@InputType()
export class SortInput {
  @Field(() => SortField)
  field: SortField;

  @Field(() => SortDirection)
  direction: SortDirection;
}

@InputType()
export class ListBookInput extends PartialType(CreateBookInput) {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  authorId?: string;

  @Field(() => Int, { nullable: true })
  minPublicationYear?: number;

  @Field(() => Int, { nullable: true })
  maxPublicationYear?: number;

  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => SortInput, { nullable: true })
  sort?: SortInput;
}
