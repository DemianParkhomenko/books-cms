import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { BooksCmsModule } from './application/books-cms/books-cms.module';
import { PersistenceModule } from './infra/persistence/persistence.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    PersistenceModule.register({
      global: true,
      type: 'prisma',
    }),
    BooksCmsModule,
  ],
})
export class AppModule {}
