import { randomString } from '@/utils/randomUtils';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Token {
  @Field(() => ID)
  _id: string;

  @Prop()
  token: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Prop()
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type TokenDocument = Token & Document;
export const TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.pre('save', function (next) {
  const token = this as unknown as TokenDocument;
  if (!token.token) {
    const prefix = token._id;
    const suffix = randomString(16);
    token.token = `${prefix}_${suffix}`;
  }
  next();
});
