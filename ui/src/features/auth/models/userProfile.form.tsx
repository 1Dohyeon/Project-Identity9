// UserProfilePage.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserPage from "../../../pages/user.page";
import { ArticleData } from "../../../shared/models/article.interface";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  nickname: string;
  articles: {
    publicArticles: ArticleData[];
    publicArticlesCount: number;
    privateArticlesCount: number;
    allArticlesCount: number;
  };
}

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  console.log(userProfile);
  const [isOwnPage, setIsOwnPage] = useState(false);
  const { nickname } = useParams<{ nickname: string }>();
  const navigate = useNavigate();

  // API 호출 결과를 담을 새로운 인터페이스 정의
  interface ApiResponse {
    data: UserProfile;
  }

  // useEffect 내 API 호출 로직
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.REACT_APP_API_URL}/users/${nickname}`
        );
        setUserProfile(response.data.data); // API 응답 구조에 따라 data를 직접 할당
      } catch (error) {
        alert("없는 사용자입니다");
        navigate("/articles");
      }
    };

    fetchUserProfile();
  }, [nickname, navigate]);

  // 데이터 접근 예시
  useEffect(() => {
    if (userProfile) {
      console.log(userProfile); // 이제 'data' 접근이 필요 없음
    }
  }, [userProfile]);

  return (
    <div>
      {userProfile ? (
        <UserPage userProfile={userProfile}></UserPage>
      ) : (
        <p>프로필 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
