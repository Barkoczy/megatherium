import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/user.entity';

@ObjectType()
export class SignResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => User)
  user: User;
}
