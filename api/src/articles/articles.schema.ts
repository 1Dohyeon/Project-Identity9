import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ArticlesStatus } from './articles.status';

// createdAt, updatedAt field
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Article extends Document {
  // 게시글 id
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  id: string;

  // 게시글 작성자 nickname
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  author: string;

  // 게시글 상태
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  status: ArticlesStatus;

  // 게시글 이름
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  // 게시글 내용
  @Prop()
  @IsString()
  description: string;

  readonly readOnlyData: {
    id: string;
    author: string;
    status: ArticlesStatus;
    title: string;
    description: string;
  };
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

// 필요한 데이터만 return
ArticleSchema.virtual('readOnlyData').get(function (this: Article) {
  return {
    id: this.id,
    author: this.author,
    status: this.status,
    title: this.title,
  };
});
