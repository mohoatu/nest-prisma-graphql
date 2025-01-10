import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { AuthResponse } from './models/auth.model';
import {
  CreateUserInput,
  UpdateUserInput,
  LoginInput
} from './dto/user.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {UnauthorizedException } from '@nestjs/common';
import { UpdatePasswordInput } from '../auth/dto/auth.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ) {
    return this.usersService.findAll(skip, take);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.userId);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') input: CreateUserInput) {
    return this.usersService.register(input);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    return this.usersService.login(input);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() user: any,
    @Args('input') input: UpdateUserInput,
  ) {
    if (user.userId !== input.id) {
      throw new UnauthorizedException('You can only update your own profile');
    }
    return this.usersService.update(input.id, input);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async removeUser(
    @CurrentUser() user: any,
    @Args('id', { type: () => Int }) id: number,
  ) {
    if (user.userId !== id) {
      throw new UnauthorizedException('You can only remove your own account');
    }
    return this.usersService.remove(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @CurrentUser() user: any,
    @Args('input') input: UpdatePasswordInput,
  ) {
    return this.usersService.updatePassword(
      user.userId,
      input.currentPassword,
      input.newPassword,
    );
  }
}