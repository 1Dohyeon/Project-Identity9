import { Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ICards from "../features/components/Cards/iCards";
import Header from "../features/components/header";
import Layout from "../features/components/layout";
import { ArticleData } from "../shared/models/article.interface";

// 임시 게시물 데이터
const tempArticles: ArticleData[] = [
  // 서버로부터 받을 예정인 데이터
  {
    id: "1",
    authorId: "1",
    title: "Top 10 travel destinations where the sunset was the prettiest",
    mainImg: "images/side1.jpg",
  },
  {
    id: "2",
    authorId: "1",
    title: "Top 10 foods which the best in Europe",
    mainImg: "images/side2.jpg",
  },
  {
    id: "3",
    authorId: "2",
    title: "Top 10 travel destinations where the sunrise was the prettiest",
    mainImg: "images/side3.jpg",
  },
  {
    id: "4",
    authorId: "1",
    title: "What happened in Iceland",
    mainImg: "images/side4.jpg",
  },
  {
    id: "5",
    authorId: "1",
    title: "The cutiest animal",
    mainImg: "images/side5.jpg",
  },
  {
    id: "6",
    authorId: "3",
    title: "Top 10 mountains with the World's Most Wonderful Sceneries",
    mainImg: "images/side6.jpg",
  },
  {
    id: "7",
    authorId: "3",
    title: "Christmas!! I can’t wait",
    mainImg: "images/side7.jpg",
  },
  {
    id: "8",
    authorId: "1",
    title: "How to travel in night",
    mainImg: "images/side9.jpg",
  },
  {
    id: "9",
    authorId: "2",
    title: "My puppy : ALEX",
    mainImg: "images/side10.jpg",
  },
  {
    id: "10",
    authorId: "1",
    title: "The best place in my life",
    mainImg: "images/side11.jpg",
  },
  {
    id: "12",
    authorId: "1",
    title:
      "test title, 제목은 최대 2줄까지 작성되고 3줄부터는 잘리도록 하였음. test title, test title, test title, test title, test title, test title, test title, test title, test title, test title ",
    mainImg: "images/layout1.png",
  },
  {
    id: "7",
    authorId: "3",
    title: "Christmas!! I can’t wait",
    mainImg: "images/side7.jpg",
  },
  {
    id: "14",
    authorId: "3",
    title:
      "test title, 제목은 최대 2줄까지 작성되고 3줄부터는 잘리도록 하였음. test title, test title, test title, test title, test title, test title, test title, test title, test title, test title ",
    mainImg: "images/side6.jpg",
  },
  {
    id: "15",
    authorId: "1",
    title:
      "test title, 제목은 최대 2줄까지 작성되고 3줄부터는 잘리도록 하였음. test title, test title, test title, test title, test title, test title, test title, test title, test title, test title ",
    mainImg: "images/layout1.png",
  },
  {
    id: "16",
    authorId: "1",
    title: "What happened in Iceland",
    mainImg: "images/side4.jpg",
  },

  // ...
];

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>(tempArticles);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/articles`
        );
        const fetchedArticles = response.data.data; // 서버로부터 받은 데이터

        // 서버로부터 받은 데이터를 ArticleData 형태로 변환
        const newArticles = fetchedArticles.map((article: any) => ({
          id: article.articleId, // 서버 데이터의 articleId를 프론트엔드 데이터의 id로 매핑
          authorId: article.authorId, // authorId는 동일하게 유지
          title: article.title, // title도 동일하게 유지
          mainImg: "images/default.jpg", // 이미지 URL은 예시로 추가 (실제 경로는 적절히 조정 필요)
        }));

        // 변환된 데이터를 기존 articles 배열에 추가
        setArticles((prevArticles) => {
          // 기존 배열에 없는 새 기사만 추가
          const updatedArticles = [...prevArticles];
          newArticles.forEach((newArticle: ArticleData) => {
            if (
              !updatedArticles.find((article) => article.id === newArticle.id)
            ) {
              updatedArticles.push(newArticle);
            }
          });
          return updatedArticles;
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <Layout>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 13 }}>
        <Grid container spacing={1} justifyContent="center">
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ICards article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default ArticlesPage;
