import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => Int)
  @IsNotEmpty()
  authorId: number;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}