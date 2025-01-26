import { Injectable } from '@nestjs/common';
import { BookReviewsRepository } from '@app/application/ports/book-reviews.repository';
import { BookReview, BookReviewProps } from '@app/domain/book-review';

@Injectable()
export class BookReviewsService {
  constructor(private readonly bookReviewsRepository: BookReviewsRepository) {}

  async list(): Promise<BookReview[]> {
    return await this.bookReviewsRepository.list();
  }

  async create(props: BookReviewProps): Promise<BookReview> {
    const bookReview = new BookReview(props);

    return await this.bookReviewsRepository.create(bookReview);
  }
}
