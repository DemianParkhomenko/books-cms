import { BookReview } from '@app/domain/book-review';

export abstract class BookReviewsRepository {
  abstract list(): Promise<BookReview[]>;
  abstract create(bookReview: BookReview): Promise<BookReview>;
}
