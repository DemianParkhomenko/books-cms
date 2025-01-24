import { BooksService } from '@app/application/services/books.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  async createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return await this.booksService.create({
      ...createBookInput,
      publicationDate: new Date(createBookInput.publicizedAt),
    });
  }

  @Query(() => [Book], { name: 'books' })
  async list() {
    return await this.booksService.list();
  }

  @Query(() => Book, { name: 'book' })
  async findOne(@Args('id') id: string) {
    return await this.booksService.get(id);
  }

  @Mutation(() => Book)
  async updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return await this.booksService.update(updateBookInput.id, {
      ...updateBookInput,
      publicationDate: new Date(updateBookInput.publicizedAt),
    });
  }

  @Mutation(() => Book)
  async removeBook(@Args('id') id: string) {
    return await this.booksService.delete(id);
  }
}
