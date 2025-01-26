import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '@app/infra/env';
import { verifyPassword } from '@app/lib/utils/crypto';

jest.mock('../users.service');
jest.mock('@app/lib/utils/crypto');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let verifyPasswordMock: jest.Mock;

  beforeEach(async () => {
    verifyPasswordMock = verifyPassword as jest.Mock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: EnvService,
          useValue: {
            get: jest.fn().mockReturnValue('secret'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should return null if user is not found', async () => {
    const email = 'test@example.com';
    const password = 'password';
    usersService.findOneByEmail = jest.fn().mockResolvedValue(null);

    const result = await authService.validateUser(email, password);
    expect(result).toBeNull();
    expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
  });

  it('should return null if password is invalid', async () => {
    const email = 'test@example.com';
    const password = 'wrongPassword';
    const user = { id: 1, email, password: 'hashedPassword' };
    usersService.findOneByEmail = jest.fn().mockResolvedValue(user);
    verifyPasswordMock.mockResolvedValue(false);

    const result = await authService.validateUser(email, password);
    expect(result).toBeNull();
    expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
    expect(verifyPasswordMock).toHaveBeenCalledWith({
      storedHash: user.password,
      password,
    });
  });

  it('should return user if credentials are valid', async () => {
    const email = 'test@example.com';
    const password = 'correctPassword';
    const user = { id: 1, email, password: 'hashedPassword' };
    usersService.findOneByEmail = jest.fn().mockResolvedValue(user);
    verifyPasswordMock.mockResolvedValue(true);

    const result = await authService.validateUser(email, password);
    expect(result).toEqual(user);
    expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
    expect(verifyPasswordMock).toHaveBeenCalledWith({
      storedHash: user.password,
      password,
    });
  });
});
