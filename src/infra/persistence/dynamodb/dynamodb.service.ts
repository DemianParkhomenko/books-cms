import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { EnvService } from '@app/infra/env';

@Injectable()
export class DynamoDBService implements OnModuleInit, OnModuleDestroy {
  private dynamoDBClient: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;

  constructor(envService: EnvService) {
    const dynamoDBRegion = envService.get('AWS_REGION');
    const dynamoDBEndpoint = envService.get('DYNAMODB_ENDPOINT');
    const dynamoDBAccessKeyId = envService.get('AWS_ACCESS_KEY_ID');
    const dynamoDBSecretAccessKey = envService.get('AWS_SECRET_ACCESS_KEY');

    const config = {
      region: dynamoDBRegion,
      credentials: {
        accessKeyId: dynamoDBAccessKeyId,
        secretAccessKey: dynamoDBSecretAccessKey,
      },
      endpoint: dynamoDBEndpoint,
    };

    this.dynamoDBClient = new DynamoDBClient(config);
    this.docClient = DynamoDBDocumentClient.from(this.dynamoDBClient);
  }

  onModuleInit() {
    console.log('DynamoDB Service initialized');
  }

  onModuleDestroy() {
    console.log('DynamoDB Service destroyed');
  }

  getDocClient(): DynamoDBDocumentClient {
    return this.docClient;
  }
}
