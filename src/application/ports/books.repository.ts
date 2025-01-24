import { Book, BookProps } from '@app/domain/book';

export abstract class BooksRepository {
  abstract delete(id: string): Promise<Book>;
  abstract update(
    id: string,
    data: Omit<BookProps, 'id' | 'publicizedAt'>,
  ): Promise<Book>;
  abstract create(data: Book): Promise<Book>;
  abstract list(): Promise<Book[]>;
  abstract get(id: string): Promise<Book>;
}
