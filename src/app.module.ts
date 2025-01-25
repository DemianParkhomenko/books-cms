import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { GraphQLModule } from '@nestjs/graphql';
import { PersistenceModule } from './infra/persistence/persistence.module';
import { UsersModule } from './application/services/users.module';
import { BooksModule } from './application/services/books.module';
import { AuthModule } from './application/services/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    PersistenceModule.register({
      global: true,
      type: 'prisma',
    }),
    AuthModule,
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
