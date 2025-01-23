import { CreateUserUseCase } from '@app/application/books-cms/use-case/create-user';
import { GetUserUseCase } from '@app/application/books-cms/use-case/get-user';
import { CacheManagerModule } from '@app/infra/persistence/cache/cache.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [AppController, UserController],
  exports: [],
  imports: [CacheManagerModule],
  providers: [CreateUserUseCase, GetUserUseCase],
})
export class HttpModule {}
