import { Test, TestingModule } from '@nestjs/testing';
import { PrismaBooksRepository } from './prisma-books.repository';
import { PrismaService } from '../prisma.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { BooksRepositoryListParams } from '@app/application/ports/books.repository';
import { PrismaBookMapper } from '../mapper/prisma-book-mapper';
import { Book } from '@app/domain/book';

jest.mock('../mapper/prisma-book-mapper');
jest.mock('@nestjs/cache-manager');

describe('PrismaBooksRepository', () => {
  let prismaBooksRepository: PrismaBooksRepository;
  let prismaService: PrismaService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaBooksRepository,
        {
          provide: PrismaService,
          useValue: { book: { findMany: jest.fn() } },
        },
        {
          provide: CACHE_MANAGER,
          useValue: { get: jest.fn(), set: jest.fn() },
        },
      ],
    }).compile();

    prismaBooksRepository = module.get<PrismaBooksRepository>(
      PrismaBooksRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should return books from the cache if available', async () => {
    const params: BooksRepositoryListParams = {
      limit: 5,
      cursor: 'someCursor',
    };
    const cachedData = {
      books: [{ id: 1, title: 'Book 1' }] as Book[],
      nextCursor: 'someNextCursor',
    };

    cacheManager.get = jest.fn().mockResolvedValue(cachedData);

    const result = await prismaBooksRepository.list(params);

    expect(result).toEqual(cachedData);
    expect(cacheManager.get).toHaveBeenCalledWith(
      `books:${JSON.stringify(params)}`,
    );
  });

  it('should return an empty array if no books found', async () => {
    const params: BooksRepositoryListParams = { limit: 5 };
    cacheManager.get = jest.fn().mockResolvedValue(null); // No cache hit
    prismaService.book.findMany = jest.fn().mockResolvedValue([]);

    const result = await prismaBooksRepository.list(params);

    expect(result.books).toHaveLength(0);
    expect(result.nextCursor).toBeNull();
  });
});
