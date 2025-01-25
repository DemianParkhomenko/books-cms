import { User } from '@app/domain/user';

export abstract class UsersRepository {
  abstract create(data: User): Promise<User>;
  abstract list(): Promise<User[]>;
}
