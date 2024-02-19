import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/authContext";
import Layout from "../features/components/layout";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { jwt, logout } = useAuth();

  const buttonStyle = {
    backgroundColor: "#b3a373",
    "&:hover": {
      backgroundColor: "#9c8c53",
    },
    margin: "1vw",
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃하겠습니까?");
    if (isConfirmed) {
      logout(); // 로그아웃 처리
      localStorage.removeItem("token"); // 로컬 스토리지의 토큰 제거
      navigate("/"); // 홈으로 리다이렉트
    }
  };

  // 버튼을 렌더링하는 함수
  const renderButton = (
    text: string,
    path: string,
    isLast = false,
    onClick = () => navigate(path)
  ) => (
    <Button
      key={text}
      variant="contained"
      onClick={onClick}
      sx={{
        ...buttonStyle,
      }}
    >
      {text}
    </Button>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#d3c493",
        color: "white",
      }}
    >
      <Layout>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Identity9
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Shape your identity with 9 posts.
        </Typography>
        <Box mt={4} sx={{ display: "flex" }}>
          {jwt ? (
            <>{renderButton("Logout", "/", true, handleLogout)}</>
          ) : (
            <>
              {renderButton("Sign In", "/signin")}
              {renderButton("Register", "/register", true)}
            </>
          )}
          {renderButton("View Articles", "/articles")}{" "}
          {/* jwt 상태에 따라 마지막 버튼 여부 결정 */}
        </Box>
      </Layout>
    </Box>
  );
};

export default HomePage;
