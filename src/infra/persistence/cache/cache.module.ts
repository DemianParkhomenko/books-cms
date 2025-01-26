import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { EnvModule, EnvService } from '@app/infra/env';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        stores: [new KeyvRedis(envService.get('REDIS_CONNECTION_STRING'))],
      }),
      inject: [EnvService],
    }),
  ],
  exports: [CacheModule],
})
export class CacheManagerModule {}
