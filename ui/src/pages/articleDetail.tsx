// ArticleDetail.tsx

import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../features/components/header";
import Layout from "../features/components/layout";
import { ArticleData } from "../shared/models/article.interface";

const ArticleDetail: React.FC = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<ArticleData | null>(null);

  useEffect(() => {
    // 게시글 정보를 불러오는 API 호출
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/articles/${articleId}`
        );
        setArticle(response.data.data);
      } catch (error) {
        console.error("게시글을 불러오는 중 에러가 발생했습니다.", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>; // 게시글 정보를 불러오는 동안 로딩 상태 표시
  }
  return (
    <Layout>
      <Header />
      <Box sx={{ pt: 10 }}>
        <h1>{article.title}</h1>
        <img
          src={article.mainImg}
          style={{ width: "100%" }}
          alt="Article Main Image"
        />
        <p>{article.description}</p>
        {/* 필요한 게시글 정보를 출력할 부분을 추가 */}
      </Box>
    </Layout>
  );
};

export default ArticleDetail;
