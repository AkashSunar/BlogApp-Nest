import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from 'src/utils/jwt';
import { TokenExtractor } from 'src/utils/token.extractor';

@Module({
  controllers: [BlogController],
  providers: [BlogService,JwtService,TokenExtractor],
  imports: [PrismaModule],
})
export class BlogModule {}
