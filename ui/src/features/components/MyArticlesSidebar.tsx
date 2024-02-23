import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios"; // Axios 추가
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MyArticlesSidebar: React.FC = () => {
  const [privateArticles, setPrivateArticles] = useState<string[]>([]);
  const [publicArticles, setPublicArticles] = useState<string[]>([]);

  const handleCreateArticle = async () => {
    try {
      const token = localStorage.getItem("token");

      // 서버로 POST 요청 보내기
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/articles`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
          },
        }
      );

      // 응답이 성공인 경우에만 로컬 상태 업데이트
      if (response.status === 200) {
        // 새로 생성된 article을 추출
        const createdArticle = response.data.data.articles.privateArticles;

        // 기존 privateArticles 상태에 새로운 article 추가
        setPrivateArticles((prevArticles) => [...prevArticles, createdArticle]);
        console.log(privateArticles); // 로그에 찍히는 값 확인
      } else {
        console.error("서버 응답이 실패하였습니다.");
      }
    } catch (error) {
      console.error("서버와의 통신 중 에러가 발생하였습니다.", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ width: "450px" }}>
        <Grid container spacing={1}>
          {/* PRIVATE ARTICLES SECTION */}
          <Grid item xs={6}>
            {/* PRIVATE SECTION TITLE AND CREATE ARTICLE BUTTON */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
                justifyContent: "center", // Center the text
              }}
            >
              <Typography variant="h6">PRIVATE</Typography>
            </Box>
            <Box
              sx={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCreateArticle}
                sx={{
                  border: "1px solid #cccccc",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  color: "gray",
                  "&:hover": {
                    border: "1px solid #dddddd",
                    backgroundColor: "#dddddd",
                    color: "#000000",
                  },
                }}
              >
                CREATE ARTICLE
              </Button>
            </Box>
            {/* PRIVATE ARTICLES LIST */}
            <List>
              {privateArticles.map((article, index) => (
                <ListItem key={index} button>
                  <ListItemText primary={article} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* PUBLIC ARTICLES SECTION */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">PUBLIC</Typography>
            </Box>
            <List>
              {publicArticles.map((article, index) => (
                <ListItem key={index} button>
                  <ListItemText primary={article} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
};

export default MyArticlesSidebar;
