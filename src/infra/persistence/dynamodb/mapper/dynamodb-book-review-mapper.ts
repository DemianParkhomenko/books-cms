import { BookReview } from '@app/domain/book-review';

export class DynamoDBBookReviewMapper {
  static toDynamoDB(bookReview: BookReview): any {
    return {
      bookId: bookReview.bookId,
      userId: bookReview.userId,
      reviewTimestamp: bookReview.reviewTimestamp,
      rating: bookReview.rating,
      comment: bookReview.comment,
    };
  }

  static toDomain(item: any): BookReview {
    return new BookReview({
      bookId: item.bookId,
      userId: item.userId,
      reviewTimestamp: item.reviewTimestamp,
      rating: item.rating,
      comment: item.comment,
    });
  }
}
