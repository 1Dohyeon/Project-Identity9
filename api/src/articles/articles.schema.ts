import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { ArticlesStatus } from './articles.status';

// 가상 필드는 기본적으로 JSON 변환 시 포함되지 않음.
// API 응답으로 가상 필드를 포함시키려면, 해당 스키마의 옵션에서 toJSON 설정에 virtuals: true를 추가해야 함.
// findAll 에서 readOnlyData 를 사용하기 위함
const options: SchemaOptions = {
  timestamps: true, // createdAt, updatedAt field
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

@Schema(options)
export class Article extends Document {
  // 게시글 작성자 id
  @Prop({
    required: true,
  })
  @IsString()
  authorId: string;

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
  @Prop({
    required: true,
  })
  @IsString()
  description: string;

  readonly readOnlyData: {
    authorId: string;
    status: ArticlesStatus;
    title: string;
  };
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

// 필요한 데이터만 return
ArticleSchema.virtual('readOnlyData').get(function (this: Article) {
  return {
    authorId: this.authorId,
    status: this.status,
    title: this.title,
  };
});
