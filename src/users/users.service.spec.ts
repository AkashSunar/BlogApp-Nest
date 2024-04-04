import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptPassword } from '../utils/bcrypt';
import { JwtService } from '../utils/jwt';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let bcrypt: BcryptPassword;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService,BcryptPassword,JwtService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    bcrypt = module.get<BcryptPassword>(BcryptPassword);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
