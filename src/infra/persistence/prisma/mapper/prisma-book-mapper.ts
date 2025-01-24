import { Book } from '@app/domain/book';

import { Prisma, Book as PrismaBook } from '@prisma/client';

export class PrismaBookMapper {
  static toDomain(entity: PrismaBook): Book {
    const model = new Book({
      id: entity.id,
      authorId: entity.authorId,
      title: entity.title,
      publicationDate: entity.publicizedAt,
    });
    return model;
  }

  static toPrisma(book: Book): Prisma.BookUncheckedCreateInput {
    return {
      authorId: book.getAuthorId(),
      title: book.getTitle(),
      publicizedAt: book.getPublicationDate(),
    };
  }
}
