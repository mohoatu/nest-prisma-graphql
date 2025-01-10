import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  @Min(0)
  skip?: number;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(50)
  take?: number;
}