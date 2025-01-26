import { Module } from '@nestjs/common';
import { EnvModule } from '@app/infra/env';

import { DynamoDBService } from './dynamodb.service';
import { BookReviewsRepository } from '@app/application/ports/book-reviews.repository';
import { DynamoDBBookReviewsRepository } from './repositories/dynamodb-book-reviews.repository';

@Module({
  imports: [EnvModule],
  providers: [
    DynamoDBService,
    {
      provide: BookReviewsRepository,
      useClass: DynamoDBBookReviewsRepository,
    },
  ],
  exports: [DynamoDBService, BookReviewsRepository],
})
export class DynamoDBModule {}
