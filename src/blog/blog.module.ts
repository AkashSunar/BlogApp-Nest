import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from 'src/utils/jwt';

@Module({
  controllers: [BlogController],
  providers: [BlogService,JwtService],
  imports: [PrismaModule],
})
export class BlogModule {}
