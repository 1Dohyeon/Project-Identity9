import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ArticleItem = ({
  id,
  text,
  index, // index 추가
  moveArticle,
}: {
  id: number;
  text: string;
  index: number; // index 추가
  moveArticle: (fromIndex: number, toIndex: number) => void;
}) => {
  const [, ref] = useDrag({
    type: "ARTICLE",
    item: { id, index }, // index 추가
  });

  const [, drop] = useDrop({
    accept: "ARTICLE",
    hover: (draggedItem: { id: number; index: number }) => {
      if (draggedItem.id !== id) {
        moveArticle(draggedItem.index, index);
      }
    },
  });

  return (
    <ListItem
      ref={(
        node /// <reference path="" />
      ) => drop(node)}
      button
    >
      <ListItemText primary={text} />
    </ListItem>
  );
};

const MyArticlesSidebar: React.FC = () => {
  const [privateArticles, setPrivateArticles] = useState<string[]>([]);
  const [publicArticles, setPublicArticles] = useState<string[]>([]);

  const handleCreateArticle = () => {
    const newArticle = `Article ${privateArticles.length + 1}`;
    setPrivateArticles((prevArticles) => [...prevArticles, newArticle]);
  };

  const moveArticle = (fromIndex: number, toIndex: number) => {
    const articleToMove = privateArticles[fromIndex];
    setPrivateArticles((prevArticles) =>
      prevArticles.filter((_, index) => index !== fromIndex)
    );
    setPrivateArticles((prevArticles) => [
      ...prevArticles.slice(0, toIndex),
      articleToMove,
      ...prevArticles.slice(toIndex),
    ]);
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
                    borderRadius: "10px", // Adjust the border radius as needed
                    padding: "10px 20px", // Adjust the padding as needed
                    fontSize: "14px", // Adjust the font size as needed
                    color: "gray", // Set the text color to gray
                    "&:hover": {
                      border: "1px solid #dddddd", // Set the border color on hover
                      backgroundColor: "#dddddd", // Set the background color on hover
                      color: "#000000",
                    },
                  }}
                >
                  CREATE ARTICLE
                </Button>
              </Box>
            </Box>
            {/* PRIVATE ARTICLES LIST */}
            <List>
              {privateArticles.map((article, index) => (
                <ArticleItem
                  key={index}
                  id={index}
                  text={article}
                  index={index} // index 추가
                  moveArticle={moveArticle}
                />
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
