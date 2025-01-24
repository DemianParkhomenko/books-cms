import { Injectable } from '@nestjs/common';

import { BooksRepository } from '@app/application/ports/books.repository';
import { Book, BookProps } from '@app/domain/book';
import { PrismaBookMapper } from '../mapper/prisma-book-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private prisma: PrismaService) {}

  async create(book: Book): Promise<Book> {
    const data = PrismaBookMapper.toPrisma(book);
    const entity = await this.prisma.book.create({ data });

    return PrismaBookMapper.toDomain(entity);
  }

  async delete(id: string): Promise<Book> {
    const entity = await this.prisma.book.delete({ where: { id } });

    return PrismaBookMapper.toDomain(entity);
  }

  async get(id: string): Promise<Book> {
    const entity = await this.prisma.book.findUnique({ where: { id } });

    return PrismaBookMapper.toDomain(entity);
  }

  async list(): Promise<Book[]> {
    const entities = await this.prisma.book.findMany();

    return entities.map((entity) => PrismaBookMapper.toDomain(entity));
  }

  async update(
    id: string,
    data: Omit<BookProps, 'id' | 'publicizedAt'>,
  ): Promise<Book> {
    const entity = await this.prisma.book.update({
      where: { id },
      data,
    });

    return PrismaBookMapper.toDomain(entity);
  }
}
