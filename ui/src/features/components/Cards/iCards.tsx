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
}

const ICards: React.FC<ICardsProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Grid>
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 250,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          mb: "25px",
          justifyContent: "space-between",
          boxShadow: "none",
          // boxShadow: "0 -4px 6px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.2)",
          borderRadius: "10px",
          transition: "background-color 0.3s", // 부드러운 색상 변화 효과
          backgroundColor: "#eeeeee", // 기본 배경 색상
          "&:hover": {
            backgroundColor: "#e0e0e0", // 마우스 오버 시 배경 색상
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
                maxWidth: 300,
                minHeight: 400, // 고정 높이를 설정하거나 비율에 따라 조정
                objectFit: "cover", // 이미지 비율 유지를 위해 cover 사용
              }}
            />
          )}
          <CardContent
            sx={{
              pt: "3px", // 패딩을 줄임
              textAlign: "center",
            }}
          >
            <Typography
              variant="body2"
              component="p"
              sx={{ flexGrow: 2, maxHeight: 30 }}
            >
              {article.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ICards;
