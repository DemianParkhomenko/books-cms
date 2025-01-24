import { Entity } from '@app/core/entities/entity';

export interface AuthorProps {
  bio: string;
  birthDate: Date;
  id?: string;
  name: string;
}

export class Author extends Entity<AuthorProps> {
  constructor(props: AuthorProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get bio(): string {
    return this.props.bio;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }
}
