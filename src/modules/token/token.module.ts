import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token } from 'graphql';
import { TokenSchema } from './models/token';
import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [TokenResolver, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
