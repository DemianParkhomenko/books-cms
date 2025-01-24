import { Injectable } from '@nestjs/common';

import { User, UserProps } from '@app/domain/user';
import { UsersRepository } from '../ports/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(params: UserProps) {
    const user = new User(params);
    console.log('service user', user);
    return await this.usersRepository.create(user);
  }
}
