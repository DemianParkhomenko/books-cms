import { Injectable } from '@nestjs/common';

import { Book, BookProps } from '@app/domain/book';
import {
  BooksRepository,
  BooksRepositoryListParams,
} from '../ports/books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async create(params: BookProps) {
    const user = new Book(params);
    return await this.booksRepository.create(user);
  }

  async delete(id: number) {
    return await this.booksRepository.delete(id);
  }

  async update(id: number, params: Omit<BookProps, 'id' | 'publicationDate'>) {
    return await this.booksRepository.update(id, params);
  }

  async list(params: BooksRepositoryListParams) {
    return await this.booksRepository.list(params);
  }

  async get(id: number) {
    return await this.booksRepository.get(id);
  }
}
