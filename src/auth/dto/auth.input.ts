import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  newPassword: string;
}