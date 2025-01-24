import { BooksService } from '@app/application/services/books.service';
import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';

@Module({
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
