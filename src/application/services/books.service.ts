import { Injectable } from '@nestjs/common';

import { Book, BookProps } from '@app/domain/book';
import { BooksRepository } from '../ports/books.repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  async create(params: BookProps) {
    const user = new Book(params);
    return await this.booksRepository.create(user);
  }

  async delete(id: string) {
    return await this.booksRepository.delete(id);
  }

  async update(id: string, params: Omit<BookProps, 'id' | 'publicizedAt'>) {
    return await this.booksRepository.update(id, params);
  }

  async list() {
    return await this.booksRepository.list();
  }

  async get(id: string) {
    return await this.booksRepository.get(id);
  }
}
