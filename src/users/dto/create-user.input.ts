import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}