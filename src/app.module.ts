import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, BlogModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
