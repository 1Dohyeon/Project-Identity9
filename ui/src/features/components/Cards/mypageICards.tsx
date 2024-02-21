import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleData } from "../../../shared/models/article.interface";

interface ICardsProps {
  article: ArticleData;
  size: "small" | "large";
}

const MypageICards: React.FC<ICardsProps> = ({ article, size }) => {
  const navigate = useNavigate();

  // small 사이즈의 카드 너비와 높이
  const smallWidth = 300; // small 카드의 기본 너비
  const smallHeight = 400; // small 카드의 기본 높이 (3:4 비율 유지)

  // large 사이즈의 카드 너비와 높이 계산
  const largeWidth = smallWidth * 2.15; // large 카드는 small의 너비의 2배
  const largeHeight = smallHeight * 2.1; // large 카드는 small의 높이의 2배

  return (
    <Grid item xs={size === "large" ? 8 : 4}>
      <Card
        sx={{
          width: size === "large" ? largeWidth : smallWidth, // large일 때 너비 조정
          height: size === "large" ? largeHeight : smallHeight, // large일 때 높이 조정
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
          borderRadius: "10px",
          mb: "25px",
          backgroundColor: "#eeeeee",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <CardActionArea
          onClick={() => navigate(`/articles/${article.articleId}`)}
        >
          {article.mainImg && (
            <CardMedia
              component="img"
              image={article.mainImg}
              alt={article.title}
              sx={{
                height: size === "large" ? largeHeight : smallHeight, // large일 때 이미지 높이 조정
                objectFit: "cover",
              }}
            />
          )}
          <CardContent>
            <Typography variant="body2" component="p">
              {article.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default MypageICards;
