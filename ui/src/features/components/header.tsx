import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/authContext";
import MyArticlesSidebar from "./MyArticlesSidebar";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { jwt, userNickname, logout } = useAuth(); // 로그아웃 함수 추가
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const location = useLocation(); // 현재 위치 가져오기
  const pathNickname = location.pathname.split("/").pop(); // URL의 마지막 부분을 닉네임으로 가정
  const isOwnPage = pathNickname === userNickname;

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMyArticlesClick = () => {
    // Toggle the sidebar visibility
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = isOwnPage
    ? [
        {
          text: "My Articles",
          onClick: () => handleMyArticlesClick(),
        },
        { text: "System", onClick: () => console.log("System Page") },
      ]
    : [
        { text: "About", onClick: () => navigate("/about") },
        { text: "Contact Us", onClick: () => navigate("/contact") },
        jwt
          ? {
              text: "My Page",
              onClick: () => navigate(`/users/${userNickname}`),
            }
          : { text: "Login", onClick: () => navigate("/login") },
      ];

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "white",
      }}
    >
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            margin: "auto",
            width: "90%",
            maxWidth: "1080px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "#000000",
              cursor: "pointer",
              fontWeight: 700,
            }}
            onClick={() => navigate("/")}
          >
            IDENTITY9
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ color: "#000000" }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{ width: 250, bgcolor: "white" }}
                  role="presentation"
                  onClick={handleDrawerToggle}
                  onKeyDown={handleDrawerToggle}
                >
                  <List>
                    {menuItems.map((item, index) => (
                      <ListItem button key={index} onClick={item.onClick}>
                        <ListItemText
                          primary={item.text}
                          sx={{ color: "#000000" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  sx={{ color: "#000000", paddingX: "10px" }}
                  onClick={item.onClick}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          {isSidebarOpen && (
            <Drawer
              anchor="right"
              open={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            >
              {/* Your sidebar content goes here */}
              <MyArticlesSidebar></MyArticlesSidebar>
            </Drawer>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
