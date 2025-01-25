import { Book, BookProps } from '@app/domain/book';

export type BooksRepositoryListParams = Partial<BookProps> & {
  maxPublicationYear?: number;
  minPublicationYear?: number;
  cursor?: string;
  limit?: number;
  sort?: {
    field: 'title' | 'publicationDate';
    direction: 'asc' | 'desc';
  };
};

export abstract class BooksRepository {
  abstract delete(id: number): Promise<Book>;
  abstract update(
    id: number,
    data: Omit<BookProps, 'id' | 'publicationDate'>,
  ): Promise<Book>;
  abstract create(data: Book): Promise<Book>;
  abstract list(
    params: BooksRepositoryListParams,
  ): Promise<{ books: Book[]; nextCursor?: string }>;
  abstract get(id: number): Promise<Book>;
}
