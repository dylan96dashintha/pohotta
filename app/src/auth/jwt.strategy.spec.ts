import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { authCredentialsDto } from './__mocks__/auth';

const mockAuthService = () => ({
    getMemberDbResponse: jest.fn(),
    parseMember: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let authService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: AuthService, useFactory: mockAuthService },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  describe('validate', () => {
    it('validates and returns the user based on JWT payload', async () => {
        authService.getMemberDbResponse(authCredentialsDto.email);
        expect(authService.getMemberDbResponse).toHaveBeenCalledWith('test@test.com');
    });
  });
});