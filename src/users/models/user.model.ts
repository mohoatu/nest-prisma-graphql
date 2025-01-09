import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../posts/models/post.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}