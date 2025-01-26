import { Injectable } from '@nestjs/common';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBService } from '../dynamodb.service';
import { DynamoDBBookReviewMapper } from '../mapper/dynamodb-book-review-mapper';
import { BookReviewsRepository } from '@app/application/ports/book-reviews.repository';
import { BookReview } from '@app/domain/book-review';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

@Injectable()
export class DynamoDBBookReviewsRepository implements BookReviewsRepository {
  private tableName = 'BookReviews';

  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async list(): Promise<BookReview[]> {
    const params = {
      TableName: this.tableName,
    };

    const client = this.dynamoDBService.getDocClient();
    const { Items } = await client.send(new ScanCommand(params));
    const unmarshalled = Items.map((item) => unmarshall(item));

    return (unmarshalled || []).map((item) =>
      DynamoDBBookReviewMapper.toDomain(item),
    );
  }

  async create(bookReview: BookReview): Promise<BookReview> {
    const item = DynamoDBBookReviewMapper.toDynamoDB(bookReview);

    const params = {
      TableName: this.tableName,
      Item: item,
    };

    await this.dynamoDBService.getDocClient().send(new PutCommand(params));

    return DynamoDBBookReviewMapper.toDomain(item);
  }
}
