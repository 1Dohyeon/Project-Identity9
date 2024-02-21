import { Container, Grid } from "@mui/material";
import React from "react";
import { UserProfile } from "../features/auth/models/userProfile.form";
import CardExample from "../features/components/Cards/CardExample";
import Header from "../features/components/header";
import Layout from "../features/components/layout";

// 임시 데이터를 생성합니다.
const tempArticles = Array.from({ length: 7 }, (_, index) => ({
  articleId: `article-${index + 1}`,
  authorId: `author-${index + 1}`,
  title: `Article Title ${index + 1}`,
  mainImg: `images/img${index + 1}.jpg`, // 예시 이미지 경로
}));

interface UserPageProps {
  userProfile: UserProfile;
}

const UserPage: React.FC<UserPageProps> = ({ userProfile }) => {
  userProfile.articles.publicArticles.forEach((e) => {
    if (e.mainImg === null) {
      e.mainImg = "images/default.jpg";
    }
  });

  const publicArticles = [
    ...userProfile.articles.publicArticles,
    ...tempArticles,
  ];
  return (
    <Layout>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 13 }}>
        <Grid container spacing={1} justifyContent="center">
          {publicArticles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.articleId}>
              <CardExample article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default UserPage;
