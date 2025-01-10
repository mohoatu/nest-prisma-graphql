import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PostOrder {
  @Field({ nullable: true })
  title?: 'asc' | 'desc';

  @Field({ nullable: true })
  createdAt?: 'asc' | 'desc';
}