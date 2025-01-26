import { Entity } from './shared/entities/entity';

export interface BookReviewProps {
  bookId: string;
  comment: string;
  id?: string;
  rating: number;
  userId: string;
  reviewTimestamp: number;
}

export class BookReview extends Entity<BookReviewProps> {
  constructor(props: BookReviewProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get bookId(): string {
    return this.props.bookId;
  }

  get userId(): string {
    return this.props.userId;
  }

  get rating(): number {
    return this.props.rating;
  }

  get comment(): string {
    return this.props.comment;
  }

  get reviewTimestamp(): number {
    return this.props.reviewTimestamp;
  }
}
