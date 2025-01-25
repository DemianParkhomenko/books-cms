import { Entity } from '@app/core/entities/entity';

export interface BookProps {
  authorId: string;
  id?: number;
  publicationDate: Date;
  title: string;
}

export class Book extends Entity<BookProps> {
  constructor(props: BookProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  get publicationDate(): Date {
    return this.props.publicationDate;
  }
}
