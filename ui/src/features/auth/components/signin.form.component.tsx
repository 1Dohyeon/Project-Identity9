import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/input/use.input";
import { validateEmail } from "../../../shared/utils/validation/email";
import { validatePasswordLength } from "../../../shared/utils/validation/length";
import { useAuth } from "../context/authContext";

const SignInComponent: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;

    if (email.length === 0 || password.length === 0) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signin`,
        {
          email,
          password,
        }
      );
      console.log(response.data);

      const token = response.data.data.token; // 토큰 추출
      localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장
      login(token); // AuthContext의 상태 업데이트

      clearForm();
      navigate("/articles");
    } catch (error) {
      console.error(error);
      alert("이메일 또는 패스워드를 확인해주세요.");
      // 에러 처리
    }
  };

  return (
    <>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: "#cccccc",
          width: "350px",
          marginTop: 2,
          borderRadius: "10px",
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <Grid container direction="column" justifyContent="flex-start">
            <Typography variant="h4" component="h1">
              Sign in
            </Typography>

            <InputLabel
              sx={{ fontWeight: 600, marginTop: 1, color: "#000000" }}
              htmlFor="email" // TextField's id
            >
              Email
            </InputLabel>
            <TextField
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
              helperText={emailHasError ? "Enter your email" : ""}
              type="text"
              name="email"
              id="email"
              variant="outlined"
              size="small"
            />

            <InputLabel
              sx={{ fontWeight: 600, marginTop: 1, color: "#000000" }}
              htmlFor="password" // TextField's id
            >
              Password
            </InputLabel>
            <TextField
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordHasError ? "6 - 20 characters required" : ""}
              type="password"
              name="password"
              id="password"
              variant="outlined"
              size="small"
              placeholder="6 - 20 characters required"
            />

            <Button
              variant="contained"
              style={{
                marginTop: "16px",
                height: "31px",
                backgroundColor: "#b9bba5",
                color: "#000000",
                borderColor: "#a88734 #9c7e31 #846a29",
                textTransform: "none",
              }}
              type="submit"
            >
              Sign-In
            </Button>
          </Grid>
        </form>
        <div style={{ marginTop: "30px" }}>
          <small>
            <span>By continuing, you agree to Identity9's</span>
          </small>
        </div>

        <div>
          <small>
            <a href="#" style={{ textDecoration: "none" }}>
              {" "}
              Conditions of use
            </a>{" "}
            and{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              Privacy policy
            </a>
          </small>
        </div>
      </Box>

      <div style={{ marginTop: "16px" }}>
        <Divider>
          <small style={{ color: "#767676" }}>New to Identity9?</small>
        </Divider>

        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#0000ee" }}
        >
          <Button
            variant="contained"
            style={{
              marginTop: "12px",
              width: "100%",
              height: "31px",
              backgroundColor: "#e1e1e1",
              color: "black",
              textTransform: "none",
            }}
          >
            Create an account
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SignInComponent;
