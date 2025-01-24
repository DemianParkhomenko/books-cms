import { Injectable } from '@nestjs/common';

import { UserRepository } from '../ports/user.repository';

interface GetUserUseCaseCommand {
  id: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({}: GetUserUseCaseCommand): Promise<any> {
    const response = {};

    return response;
  }
}
