import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ArticleData } from "../../../shared/models/article.interface";

interface ICardsProps {
  article: ArticleData;
}

const CardExample: React.FC<ICardsProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-around">
      <Card
        style={{ width: "18rem", cursor: "pointer", marginBottom: "10px" }}
        onClick={() => navigate(`/articles/${article.articleId}`)}
      >
        <div style={{ width: "100%", height: 0, paddingTop: "133%" }}>
          <Card.Img
            variant="top"
            src={article.mainImg}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title
            style={{
              textAlign: "center",
              fontSize: "15px",
              marginBottom: "15px",
              display: "-webkit-box",
              WebkitLineClamp: 2, // 두 줄만 표시
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.5em", // 줄 높이 설정, 2줄이므로 2 * 1.5em = 3em이 최대 높이
            }}
          >
            {article.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardExample;
