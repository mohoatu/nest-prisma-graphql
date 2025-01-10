import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PostWhereInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  published?: boolean;

  @Field({ nullable: true })
  authorId?: number;
}