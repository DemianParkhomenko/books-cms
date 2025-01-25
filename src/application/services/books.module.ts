import { BooksService } from '@app/application/services/books.service';
import { BooksResolver } from '@app/infra/graphql/books/books.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
