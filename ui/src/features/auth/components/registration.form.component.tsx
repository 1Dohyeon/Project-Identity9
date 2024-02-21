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
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/input/use.input";
import { validateEmail } from "../../../shared/utils/validation/email";
import {
  validateNameLength,
  validateNicknameLength,
  validatePasswordLength,
} from "../../../shared/utils/validation/length";

const RegisterComponent: React.FC = () => {
  const navigate = useNavigate();
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const {
    text: nickname,
    shouldDisplayError: nicknameHasError,
    textChangeHandler: nicknameChangeHandler,
    inputBlurHandler: nicknameBlurHandler,
    clearHandler: nicknameClearHandler,
  } = useInput(validateNicknameLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
    nicknameClearHandler();
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일 형태 검증
    if (!validateEmail(email)) {
      alert("이메일이 형태가 올바르지 않습니다.");
      return;
    }

    if (password !== confirmPassword) return;

    try {
      const newUser = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          email,
          password,
          name,
          nickname,
        }
      );

      console.log(newUser.data);

      alert("회원가입 성공");
      clearForm();
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 리다이렉트합니다.
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러인 경우, 서버 응답에서 에러 메시지 추출
        const serverMessage = error.response?.data.message || "로그인 실패";
        alert(serverMessage);
      } else {
        // 그 외 에러 처리
        console.error("로그인 요청 중 에러 발생", error);
        alert("로그인 요청 중 에러 발생");
      }
    }
  };

  return (
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
            Create account
          </Typography>

          <InputLabel
            sx={{ fontWeight: 600, marginTop: 1, color: "#000000" }}
            htmlFor="name" // TextField's id
          >
            Name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? "Enter your name" : ""}
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />

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

          <InputLabel
            sx={{ fontWeight: 600, marginTop: 1, color: "#000000" }}
            htmlFor="confirm-password" // TextField's id
          >
            Re-enter Password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? "Password must match"
                : ""
            }
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            variant="outlined"
            size="small"
          />

          <InputLabel
            sx={{ fontWeight: 600, marginTop: 1, color: "#000000" }}
            htmlFor="confirm-password" // TextField's id
          >
            Your nickname
          </InputLabel>
          <TextField
            value={nickname}
            onChange={nicknameChangeHandler}
            onBlur={nicknameBlurHandler}
            error={nicknameHasError}
            helperText={nicknameHasError ? "4 - 16 characters required" : ""}
            type="text"
            name="nickname"
            id="nickname"
            variant="outlined"
            size="small"
          />

          <Button
            variant="contained"
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#d3c493",
              color: "black",
              borderColor: "#a88734 #9c7e31 #846a29",
              textTransform: "none",
            }}
            type="submit"
          >
            Register
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: "30px" }}>
        <small>
          <span>By creating an acount, you agree to Identity9's</span>
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

      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />

      <div>
        <small>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            Login
          </Link>
        </small>
      </div>
    </Box>
  );
};

export default RegisterComponent;
