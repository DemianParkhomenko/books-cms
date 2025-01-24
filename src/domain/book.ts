import { Entity } from '@app/core/entities/entity';

export interface BookProps {
  authorId: string;
  id?: string;
  publicationDate: Date;
  title: string;
}

export class Book extends Entity<BookProps> {
  constructor(props: BookProps) {
    super(props);
  }

  getId(): string {
    return this.props.id;
  }

  getTitle(): string {
    return this.props.title;
  }

  getAuthorId(): string {
    return this.props.authorId;
  }

  getPublicationDate(): Date {
    return this.props.publicationDate;
  }
}
