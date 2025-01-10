import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import {
  CreateUserInput,
  UpdateUserInput,
  LoginInput,
  UpdatePasswordInput
} from './dto/user.input';
import { User } from './models/user.model';
import { AuthResponse } from './models/auth.model';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findAll(skip = 0, take = 10): Promise<User[]> {
    return this.prisma.user.findMany({
      skip,
      take,
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async getProfile(id: number): Promise<User> {
    return this.findOne(id);
  }

  async register(input: CreateUserInput): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const userData: Prisma.UserCreateInput = {
      email: input.email,
      name: input.name,
      password: hashedPassword,
    };

    const user = await this.prisma.user.create({
      data: userData,
    });

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { token };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(input.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { token };
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    await this.findOne(id);

    const updateData: Prisma.UserUpdateInput = {
      email: input.email,
      name: input.name,
    };

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<User> {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updatePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return true;
  }
}