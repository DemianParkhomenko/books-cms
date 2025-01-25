import { User } from '@app/domain/user';

export abstract class UsersRepository {
  abstract create(data: User): Promise<User>;
  abstract list(): Promise<User[]>;
  abstract get(id: string): Promise<User>;
  abstract findByCredentials(params: {
    email: string;
    password: string;
  }): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract findOne(params: {
    email?: string;
    name?: string;
    id?: string;
  }): Promise<User>;
}
