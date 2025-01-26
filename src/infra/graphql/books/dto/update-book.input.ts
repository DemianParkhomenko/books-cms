import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
import { Length } from 'class-validator';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field()
  id: string;

  @Field()
  @Length(2, 30)
  title: string;

  @Field()
  authorId: string;
}
