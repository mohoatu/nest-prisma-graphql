import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], // Import AuthModule which exports JwtModule
  providers: [UsersService, UsersResolver, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}