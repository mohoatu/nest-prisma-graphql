import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field()
  @IsNotEmpty()
  currentPassword: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}