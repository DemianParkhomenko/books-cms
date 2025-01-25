import { Book } from '@app/domain/book';

import { Prisma, Book as PrismaBook } from '@prisma/client';

export class PrismaBookMapper {
  static toDomain(entity: PrismaBook): Book {
    const model = new Book({
      id: entity.id,
      authorId: entity.authorId,
      title: entity.title,
      publicationDate: entity.publicationDate,
    });
    return model;
  }

  static toPrisma(book: Book): Prisma.BookUncheckedCreateInput {
    return {
      authorId: book.authorId,
      title: book.title,
      publicationDate: book.publicationDate,
      id: book.id,
    };
  }
}
