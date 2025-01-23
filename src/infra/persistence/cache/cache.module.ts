import { EnvModule, EnvService } from '@app/infra/env';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  exports: [CacheModule],
  imports: [
    CacheModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      isGlobal: false,
      useFactory: async (configService: EnvService) => ({
        max: configService.get('CACHE_MAX'),
        ttl: configService.get('CACHE_TTL'),
      }),
    }),
  ],
})
export class CacheManagerModule {}
