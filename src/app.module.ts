import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PersistenceModule } from './infra/persistence/persistence.module';
import { UsersModule } from './application/services/users.module';
import { BooksModule } from './application/services/books.module';
import { AuthModule } from './application/services/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard, MILLISECOND } from './lib';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: MILLISECOND.MINUTE, limit: 10 }]),
    PersistenceModule.register({ global: true, type: 'prisma' }),
    AuthModule,
    UsersModule,
    BooksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'graphql/schema.graphql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: GqlThrottlerGuard }],
})
export class AppModule {}
