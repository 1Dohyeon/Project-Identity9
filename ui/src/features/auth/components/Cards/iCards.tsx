import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleData } from "../../../../shared/models/article.interface";

interface ICardsProps {
  article: ArticleData;
}

const ICards: React.FC<ICardsProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea onClick={() => navigate(`/articles/${article.id}`)}>
        {article.mainImg && (
          <CardMedia
            component="img"
            height="312"
            image={article.mainImg}
            alt={article.title}
          />
        )}
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            sx={{ flexGrow: 1, maxHeight: 60 }}
          >
            {article.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ICards;
