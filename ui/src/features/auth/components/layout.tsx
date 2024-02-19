import { Box } from "@mui/material";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // 세로 정렬을 위해 column으로 설정
        justifyContent: "center", // 세로 중앙 정렬
        alignItems: "center", // 가로 중앙 정렬
        minHeight: "100vh", // 최소 높이를 뷰포트 높이의 100%로 설정
        mx: "auto", // 좌우 마진 자동으로 적용하여 중앙 정렬
        maxWidth: "1008px", // 최대 너비 설정
        width: "100%", // 전체 너비를 부모에 맞춤
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
