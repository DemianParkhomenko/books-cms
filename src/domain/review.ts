import { Entity } from '@app/core/entities/entity';

export interface ReviewProps {
  bookId: string;
  comment: string;
  id?: string;
  rating: number;
  userId: string;
}

export class Review extends Entity<ReviewProps> {
  constructor(props: ReviewProps) {
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
}
