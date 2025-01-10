import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationArgs } from '../common/dto/pagination.args';
import { PostOrder } from './dto/post-order.input';
import { PostWhereInput } from './dto/post-where.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  async posts(
    @Args() { skip, take }: PaginationArgs,
    @Args('orderBy', { nullable: true }) orderBy?: PostOrder,
    @Args('where', { nullable: true }) where?: PostWhereInput,
  ) {
    return this.postsService.findAll(skip, take, where, orderBy);
  }

  @Query(() => Post, { nullable: true })
  async post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(@Args('input') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('input') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}