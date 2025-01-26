import { EnvModule } from '@app/infra/env';
import { Module } from '@nestjs/common';

import { BooksRepository } from '@app/application/ports/books.repository';
import { UsersRepository } from '@app/application/ports/users.repository';
import { PrismaService } from './prisma.service';
import { PrismaBooksRepository } from './repositories/prisma-books.repository';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { CacheManagerModule } from '../cache/cache.module';

@Module({
  exports: [PrismaService, UsersRepository, BooksRepository],
  imports: [EnvModule, CacheManagerModule],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: BooksRepository,
      useClass: PrismaBooksRepository,
    },
  ],
})
export class PrismaModule {}
