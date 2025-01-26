# Books CMS

## Local development

To start the project locally, run the following commands:

```bash
npm i && cp .env.example .env && docker-compose up -d && npx prisma migrate dev && npm run start:dev
```

## Tests

To run tests:

```bash
npm run test
```

## API

The API documentation can be found at https://studio.apollographql.com/public/Books-CMS/variant/current/explorer or you can run the project locally and access http://localhost:3000/graphql

## Database

To see the database, you can run:

```js
npx prisma studio
```

## Application architecture

The Books CMS is designed using a Layered Architecture based on the Ports and Adapters (Hexagonal Architecture) pattern. This approach ensures scalability, maintainability, and a clear separation of concerns while seamlessly integrating multiple data sources—PostgreSQL, DynamoDB, and Redis.

```plaintext
.
├── app.module.ts # Root module that orchestrates application components
├── application # Application layer: handles use cases and business processes via ports
├── domain # Domain layer: core business logic and entities
├── infra # Infrastructure layer: adapters for data sources and external integrations
├── lib # Shared utilities and reusable components
└── main.ts # Application bootstrap and entry point
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
