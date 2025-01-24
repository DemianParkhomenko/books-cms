import { CreateUserUseCase } from '@app/application/books-cms/use-case/create-user';
import { GetUserUseCase } from '@app/application/books-cms/use-case/get-user';
import { HttpCacheInterceptor } from '@app/infra/persistence/cache/interceptor/http-cache.interceptor';
import { CacheKey } from '@nestjs/cache-manager';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
  ) {}

  @Get('')
  @CacheKey('users')
  @UseInterceptors(HttpCacheInterceptor)
  getAll() {
    const response = this.getUserUseCase.execute({ id: '1' });
    return response;
  }

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    const response = this.createUserUseCase.execute(createUserDto);
    return response;
  }
}
