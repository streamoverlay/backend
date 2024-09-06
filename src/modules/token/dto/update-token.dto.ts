import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export default class UpdateTokenDTO {
  @IsNotEmpty()
  @MaxLength(64)
  @Field(() => String, { nullable: true })
  name?: string;
}
