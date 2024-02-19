import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { jwt } = useAuth();

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "white",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box
        sx={{
          margin: "auto",
          width: "1008px",
        }}
      >
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, color: "#d3c493", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            IDENTITY9
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              color="inherit"
              sx={{ color: "#d3c493", paddingX: "10px" }}
              onClick={() => navigate("/about")}
            >
              About
            </Button>
            <Button
              color="inherit"
              sx={{ color: "#d3c493", paddingX: "10px" }}
              onClick={() => navigate("/contact")}
            >
              Contact us
            </Button>
            {jwt ? (
              <Button
                color="inherit"
                sx={{ color: "#d3c493", paddingX: "10px" }}
                onClick={() => navigate("/my-page")}
              >
                MY PAGE
              </Button>
            ) : (
              <Button
                color="inherit"
                sx={{ color: "#d3c493", paddingX: "10px" }}
                onClick={() => navigate("/signin")}
              >
                SIGN IN
              </Button>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
