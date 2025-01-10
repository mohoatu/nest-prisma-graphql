import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    return this.prisma.post.create({
      data: createPostInput,
      include: {
        author: true,
      },
    });
  }

  async findAll(
    skip?: number,
    take?: number,
    where?: any,
    orderBy?: any,
  ): Promise<Post[]> {
    return this.prisma.post.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        author: true,
      },
    });
  }

  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: updatePostInput,
      include: {
        author: true,
      },
    });
  }

  async remove(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}