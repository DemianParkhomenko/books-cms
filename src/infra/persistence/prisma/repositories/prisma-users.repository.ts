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
    const entity = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return PrismaUserMapper.toDomain(entity);
  }

  async list(): Promise<User[]> {
    const entities = await this.prisma.user.findMany();

    return entities.map((entity) => PrismaUserMapper.toDomain(entity));
  }

  async get(id: string): Promise<User> {
    const entity = await this.prisma.user.findUnique({
      where: { id },
    });

    return PrismaUserMapper.toDomain(entity);
  }

  async findByCredentials(params: {
    email: string;
    password: string;
  }): Promise<User> {
    const entity = await this.prisma.user.findFirst({
      where: {
        email: params.email,
        password: params.password,
      },
    });

    return PrismaUserMapper.toDomain(entity);
  }

  async findById(id: string): Promise<User> {
    const entity = await this.prisma.user.findUnique({
      where: { id },
    });

    return PrismaUserMapper.toDomain(entity);
  }

  async findOne(params: { email?: string; name?: string }): Promise<User> {
    if (!params.email && !params.name) {
      throw new Error('Email or name is required');
    }
    const entity = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: params.email }, { name: params.name }],
      },
    });

    return PrismaUserMapper.toDomain(entity);
  }
}
