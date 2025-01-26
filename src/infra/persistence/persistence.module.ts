import { DynamicModule, Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { DynamoDBModule } from './dynamodb/dynamodb.module';

interface DatabaseOptions {
  global?: boolean;
  type: 'prisma';
}

@Module({})
export class PersistenceModule {
  static async register({
    global = false,
    type,
  }: DatabaseOptions): Promise<DynamicModule> {
    return {
      exports: [PrismaModule, DynamoDBModule],
      global,
      imports: [PrismaModule, DynamoDBModule],
      module: PersistenceModule,
    };
  }
}
