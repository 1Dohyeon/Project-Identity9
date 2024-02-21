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
        style={{ width: "18rem" }}
        onClick={() => navigate(`/articles/${article.articleId}`)}
      >
        <Card.Img
          variant="top"
          src={article.mainImg}
          style={{
            objectFit: "cover",
            maxHeight: 400,
            maxWidth: 300,
            minHeight: 400,
          }}
        />
        <Card.Body>
          <Card.Title style={{ marginBottom: "15px" }}>
            {article.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardExample;
