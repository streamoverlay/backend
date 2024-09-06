import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateTokenDTO from './dto/create-token.dto';
import UpdateTokenDTO from './dto/update-token.dto';
import { Token, TokenDocument } from './models/token';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: Model<TokenDocument>,
  ) {}

  public async createToken(
    userId: string,
    payload: CreateTokenDTO,
  ): Promise<string> {
    const tokens = await this.tokenModel.countDocuments({ userId });
    if (tokens >= 5) {
      throw new BadRequestException(
        'You have reached the maximum number of developer tokens',
      );
    }

    const token = new this.tokenModel({ userId, ...payload });
    await token.save();
    return token.token;
  }

  public async getToken(token: string, userId: string): Promise<Token> {
    return await this.tokenModel.findOne({ token, userId });
  }

  public async getTokens(userId: string): Promise<Token[]> {
    return await this.tokenModel.find({ userId });
  }

  public async deleteToken(id: string, userId: string): Promise<void> {
    await this.tokenModel.deleteOne({ _id: id, userId });
  }

  public async deleteAllTokens(userId: string): Promise<void> {
    await this.tokenModel.deleteMany({ userId });
  }

  public async updateToken(
    tokenId: string,
    userId: string,
    payload: UpdateTokenDTO,
  ): Promise<boolean> {
    const result = await this.tokenModel.updateOne(
      { _id: tokenId, userId },
      payload,
    );

    return result.modifiedCount > 0;
  }
}
