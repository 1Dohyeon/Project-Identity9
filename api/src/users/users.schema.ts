import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { Articles } from 'src/articles/articles.schema';

// createdAt, updatedAt field
const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Users extends Document {
  // 사용자 email(로그인시 id 역할, 중복x)
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // 사용자 패스워드
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  // 사용자 이름
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  // 사용자 닉네임(중복x)
  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  nickname: string;

  // 사용자 프로필 사진
  @Prop()
  @IsString()
  profileImgUrl: string;

  // 사용자의 public 게시물 갯수(페이지에 올라갈 게시물, 따라서 최대 9개
  // but 유료버전으로 페이지에 안띄우고 공개만 해둘 수도 있음)
  @Prop({
    required: true,
    default: 0,
  })
  @IsNumber()
  publicArticlesCount: number;

  // 사용자의 private 게시물 갯수
  @Prop({
    required: true,
    default: 0,
  })
  @IsNumber()
  privateArticlesCount: number;

  // 사용자 전체 게시물 갯수
  @Prop({
    required: true,
    default: 0,
  })
  @IsNumber()
  allArticlesCount: number;

  // 사용자 public 게시물
  @Prop()
  @IsArray()
  publicArticles: Articles[];

  // 사용자 private 게시물
  @Prop()
  @IsArray()
  privateArticles: Articles[];

  readonly readOnlyData: {
    userId: string;
    email: string;
    name: string;
    nickname: string;
  };

  readonly readOnlyDataWithArticles: {
    userId: string;
    email: string;
    name: string;
    nickname: string;
    articles: {
      publicArticles: Articles[];
      privateArticles: Articles[];
      allArticlesCount: number;
      publicArticlesCount: number;
      privateArticlesCount: number;
    };
  };
}

export const UserSchema = SchemaFactory.createForClass(Users);

// Virtuals 포함 설정
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// user 정보만
UserSchema.virtual('readOnlyData').get(function (this: Users) {
  return {
    userId: this.id,
    email: this.email,
    name: this.name,
    nickname: this.nickname,
  };
});

// user와 user의 article 관련 정보들
UserSchema.virtual('readOnlyDataWithArticles').get(function (this: Users) {
  return {
    userId: this.id,
    email: this.email,
    name: this.name,
    nickname: this.nickname,
    articles: {
      publicArticles: this.publicArticles,
      privateArticles: this.privateArticles,
      allArticlesCount: this.allArticlesCount,
      publicArticlesCount: this.publicArticlesCount,
      privateArticlesCount: this.privateArticlesCount,
    },
  };
});
