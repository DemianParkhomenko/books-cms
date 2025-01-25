import { Entity } from '@app/core/entities/entity';

export interface UserProps {
  id?: string;
  name: string;
  password: string;
  email: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get password(): string {
    return this.props.password;
  }

  get email(): string {
    return this.props.email;
  }
}
