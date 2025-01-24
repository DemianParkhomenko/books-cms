import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { GraphQLModule } from '@nestjs/graphql';
import { BooksModule } from './infra/graphql/books/books.module';
import { UsersModule } from './infra/graphql/users/users.module';
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
    UsersModule,
    BooksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'graphql/schema.graphql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class AppModule {}
