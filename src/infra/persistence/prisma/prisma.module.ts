import { UserRepository } from '@app/application/books-cms/ports/user.repository';
import { EnvModule } from '@app/infra/env';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './repositories/prisma-user.repositoy';

@Module({
  exports: [PrismaService, UserRepository],
  imports: [EnvModule],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class PrismaModule {}
