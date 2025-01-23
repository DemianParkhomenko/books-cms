import { User } from '@app/domain/books-cms/user';

export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
}
