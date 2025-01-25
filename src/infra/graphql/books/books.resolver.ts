import { BooksService } from '@app/application/services/books.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book, Books } from './entities/book.entity';
import { ListBookInput } from './dto/list-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return await this.booksService.create(createBookInput);
  }

  @Query(() => Books, { name: 'books' })
  async list(
    @Args('listBookInput') listBookInput: ListBookInput,
  ): Promise<Books> {
    const result = await this.booksService.list({
      ...listBookInput,
      id: listBookInput.id ? +listBookInput.id : undefined,
    });

    return {
      nextCursor: result.nextCursor ? result.nextCursor : '',
      node: result.books,
    };
  }

  @Query(() => Book, { name: 'book' })
  async findOne(@Args('id') id: string) {
    return await this.booksService.get(+id);
  }

  @Mutation(() => Book)
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return await this.booksService.update(+updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  async removeBook(@Args('id') id: string) {
    return await this.booksService.delete(+id);
  }
}
