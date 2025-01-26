import { Injectable } from '@nestjs/common';

import { User, UserProps } from '@app/domain/user';
import { UsersRepository } from '../ports/users.repository';
import { hashPassword } from '@app/infra/utils';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(params: UserProps) {
    const hashedPassword = await hashPassword(params.password);
    const user = new User({ ...params, password: hashedPassword });
    return await this.usersRepository.create(user);
  }

  async list() {
    return await this.usersRepository.list();
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ id });
  }

  async findOneByName(name: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ name });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }
}
