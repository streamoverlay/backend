import { GqlAuthGuard } from '@/auth/guards/gql-auth.guard';
import { IsCreatorGuard } from '@/auth/guards/is-creator.guard';
import { IsVerifiedGuard } from '@/auth/guards/is-verified.guard';
import CurrentUser from '@/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/models/user';
import CreateTokenDTO from './dto/create-token.dto';
import UpdateTokenDTO from './dto/update-token.dto';
import { Token } from './models/token';
import { TokenService } from './token.service';

@Resolver(() => Token)
export class TokenResolver {
  constructor(private tokenService: TokenService) {}

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, IsCreatorGuard, IsVerifiedGuard)
  async createToken(
    @CurrentUser() user: User,
    @Args('payload') payload: CreateTokenDTO,
  ): Promise<string> {
    return await this.tokenService.createToken(user._id, payload);
  }

  @Query(() => [Token])
  @UseGuards(GqlAuthGuard)
  async getMyTokens(@CurrentUser() user: User): Promise<Token[]> {
    return await this.tokenService.getTokens(user._id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteToken(
    @Args('tokenId') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    await this.tokenService.deleteToken(id, user._id);
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteAllTokens(@CurrentUser() user: User): Promise<boolean> {
    await this.tokenService.deleteAllTokens(user._id);
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateToken(
    @CurrentUser() user: User,
    @Args('tokenId') tokenId: string,
    @Args('payload') payload: UpdateTokenDTO,
  ): Promise<boolean> {
    return await this.tokenService.updateToken(tokenId, user._id, payload);
  }
}
