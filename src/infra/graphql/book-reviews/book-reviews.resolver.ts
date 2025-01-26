import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookReviewsService } from '@app/application/services/book-reviews.service';
import { CreateBookReviewInput } from './dto/create-book-review.input';
import { BookReview } from './entities/book-review';
import { UseGuards } from '@nestjs/common';
import { GqlRolesGuard, Roles } from '@app/lib';
import { Role } from '@prisma/client';

@Resolver(() => BookReview)
export class BookReviewsResolver {
  constructor(private readonly bookReviewsService: BookReviewsService) {}

  @UseGuards(GqlRolesGuard)
  @Roles(Role.ADMIN)
  @Query(() => [BookReview], { name: 'bookReviews' })
  async listBookReviews(): Promise<BookReview[]> {
    return await this.bookReviewsService.list();
  }

  @Mutation(() => BookReview)
  async addBookReview(
    @Args('createBookReviewInput') createBookReviewInput: CreateBookReviewInput,
  ): Promise<BookReview> {
    return await this.bookReviewsService.create({
      ...createBookReviewInput,
      reviewTimestamp: Date.now(),
    });
  }
}
