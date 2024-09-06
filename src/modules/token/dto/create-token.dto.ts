import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export default class CreateTokenDTO {
  @IsNotEmpty()
  @MaxLength(64)
  @Field(() => String)
  name: string;
}
