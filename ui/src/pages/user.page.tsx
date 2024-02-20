import { Container } from "@mui/material";
import React from "react";
import { UserProfile } from "../features/auth/models/userProfile.form";
import Header from "../features/components/header";
import Layout from "../features/components/layout";

// UserPage 컴포넌트의 props 타입 정의
interface UserPageProps {
  userProfile: UserProfile;
}

const UserPage: React.FC<UserPageProps> = ({ userProfile }) => {
  return (
    <Layout>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 13 }}>
        {userProfile.name}
      </Container>
    </Layout>
  );
};

export default UserPage;
