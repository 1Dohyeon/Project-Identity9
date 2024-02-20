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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/authContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { jwt, userNickname } = useAuth(); // 닉네임 사용
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "About", onClick: () => navigate("/about") },
    { text: "Contact Us", onClick: () => navigate("/contact") },
    jwt
      ? { text: "My Page", onClick: () => navigate(`/users/${userNickname}`) } // 사용자 닉네임으로 경로 업데이트
      : { text: "Sign In", onClick: () => navigate("/signin") },
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
            sx={{ flexGrow: 1, color: "#d3c493", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            IDENTITY9
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ color: "#d3c493" }}
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
                          sx={{ color: "#d3c493" }}
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
                  sx={{ color: "#d3c493", paddingX: "10px" }}
                  onClick={item.onClick}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
