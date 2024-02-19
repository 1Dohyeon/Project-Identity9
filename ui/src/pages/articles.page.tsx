import { Container, Grid } from "@mui/material";
import React from "react";
import ICards from "../features/auth/components/Cards/iCards";
import Header from "../features/auth/components/header";
import Layout from "../features/auth/components/layout";
import { ArticleData } from "../shared/models/article.interface";

// 임시 게시물 데이터
const articles: ArticleData[] = [
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
    id: "11",
    authorId: "1",
    title: "The best place in my life",
    mainImg: "images/side11.jpg",
  },
  {
    id: "12",
    authorId: "1",
    title:
      "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ",
    mainImg: "images/layout1.png",
  },
  // ...
];

const ArticlesPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 13 }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{
            display: "flex", // flex 레이아웃 적용
            justifyContent: "center", // 수직 방향 가운데 정렬
            alignItems: "center", // 수평 방향 가운데 정렬
          }}
        >
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
              <ICards article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default ArticlesPage;
