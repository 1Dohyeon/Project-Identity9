import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignInPage.css";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signin`,
        {
          email,
          password,
        }
      );
      console.log(response.data);
      alert("로그인 성공");
      // 여기서 로그인 성공 후의 로직을 처리할 수 있습니다.
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
      // 에러 처리
    }
  };

  return (
    <div className="signin-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          로그인
        </button>
      </form>
      <Link to="/register" className="register-link">
        회원가입
      </Link>
    </div>
  );
};

export default SignInPage;
