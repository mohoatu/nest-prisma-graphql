import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    return users as unknown as User[];
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
    return user as unknown as User;
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data,
      include: {
        posts: true,
      },
    });
    return user as unknown as User;
  }
}