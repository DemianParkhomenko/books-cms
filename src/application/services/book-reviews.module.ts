import { Module } from '@nestjs/common';
import { BookReviewsService } from './book-reviews.service';
import { BookReviewsResolver } from '@app/infra/graphql/book-reviews/book-reviews.resolver';

@Module({
  providers: [BookReviewsService, BookReviewsResolver],
})
export class BooksReviewModule {}
