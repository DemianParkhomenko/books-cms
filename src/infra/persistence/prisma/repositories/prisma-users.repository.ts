import { User } from '@app/domain/user';
import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@app/application/ports/users.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mapper/prisma-user-mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);
    console.log('db request', data.name);
    const entity = await this.prisma.user.create({
      data: {
        name: data.name,
      },
    });

    return PrismaUserMapper.toDomain(entity);
  }

  async list(): Promise<User[]> {
    const entities = await this.prisma.user.findMany();

    return entities.map((entity) => PrismaUserMapper.toDomain(entity));
  }
}
