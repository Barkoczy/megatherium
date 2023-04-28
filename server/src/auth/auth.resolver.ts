import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignResponse } from './dto/sign.respone';
import { LogoutResponse } from './dto/logout.response';
import { NewTokensResponse } from './dto/new-tokens.response';
import { Public } from './decorators/public.decorator';
import { CurrentUserId } from './decorators/current-user-id.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello() {
    return 'Hello world';
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    return this.authService.findAll();
  }

  @Query(() => Auth, { name: 'auth' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authService.findOne(id);
  }

  @Public()
  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  signin(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signin(signInInput);
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => NewTokensResponse)
  getNewTokens(
    @CurrentUserId() userId: number,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.getNewTokens(userId, refreshToken);
  }

  @Mutation(() => LogoutResponse)
  logout(@Args('id', { type: () => Int }) id: number) {
    return this.authService.logout(id);
  }
}
