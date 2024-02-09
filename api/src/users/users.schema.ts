import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  nickname: string;

  @Prop()
  @IsString()
  profileImgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    nickname: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

// 필요한 데이터만 return
UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    nickname: this.nickname,
  };
});
