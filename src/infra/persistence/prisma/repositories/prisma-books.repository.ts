import { Inject, Injectable } from '@nestjs/common';

import {
  BooksRepository,
  BooksRepositoryListParams,
} from '@app/application/ports/books.repository';
import { Book, BookProps } from '@app/domain/book';
import { PrismaBookMapper } from '../mapper/prisma-book-mapper';
import { PrismaService } from '../prisma.service';
import { decodeCursor, encodeCursor } from '@app/lib';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private buildPublicationDateQuery(params: BooksRepositoryListParams) {
    const { publicationDate, minPublicationYear, maxPublicationYear } = params;
    const query = [];
    if (publicationDate) {
      query.push({ publicationDate: new Date(publicationDate) });
    }
    if (minPublicationYear) {
      query.push({
        publicationDate: { gte: new Date(`${minPublicationYear}-01-01`) },
      });
    }
    if (maxPublicationYear) {
      query.push({
        publicationDate: { lte: new Date(`${maxPublicationYear}-12-31`) },
      });
    }

    return query;
  }

  async create(book: Book): Promise<Book> {
    const data = PrismaBookMapper.toPrisma(book);
    const entity = await this.prisma.book.create({ data });

    return PrismaBookMapper.toDomain(entity);
  }

  async delete(id: number): Promise<Book> {
    const entity = await this.prisma.book.delete({ where: { id } });

    return PrismaBookMapper.toDomain(entity);
  }

  async get(id: number): Promise<Book> {
    const entity = await this.prisma.book.findUnique({ where: { id } });

    return PrismaBookMapper.toDomain(entity);
  }

  async list(
    params: BooksRepositoryListParams,
  ): Promise<{ books: Book[]; nextCursor: string | null }> {
    const cacheKey = `books:${JSON.stringify(params)}`;
    const cached = await this.cacheManager.get<any>(cacheKey);
    if (cached) {
      return cached;
    }
    const { authorId, id, title, limit = 10, sort } = params;
    const publicationDateQuery = this.buildPublicationDateQuery(params);
    const cursor = params.cursor ? decodeCursor(params.cursor) : null;

    const books = await this.prisma.book.findMany({
      where: {
        AND: [
          authorId ? { authorId } : {},
          id ? { id } : {},
          title ? { title: { contains: title, mode: 'insensitive' } } : {},
          ...publicationDateQuery,
        ],
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor.id } : undefined,
      orderBy: sort ? { [sort.field]: sort.direction } : { id: 'asc' },
    });

    const nextCursor =
      books.length === limit ? encodeCursor({ id: books.at(-1)?.id }) : null;

    await this.cacheManager.set(cacheKey, { books, nextCursor });

    return {
      books: books.map(PrismaBookMapper.toDomain),
      nextCursor,
    };
  }

  async update(
    id: number,
    data: Omit<BookProps, 'id' | 'publicationDate'>,
  ): Promise<Book> {
    const entity = await this.prisma.book.update({
      where: { id },
      data,
    });

    return PrismaBookMapper.toDomain(entity);
  }
}
