import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import useInput from "../../../hooks/input/use.input";
import { validateEmail } from "../../../shared/utils/validation/email";
import {
  validateNameLength,
  validateNickNameLength,
  validatePasswordLength,
} from "../../../shared/utils/validation/length";
import { NewUser } from "../models/newUser";

const RegisterComponent: FC = () => {
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
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const {
    text: nickName,
    shouldDisplayError: nickNameHasError,
    textChangeHandler: nickNameChangeHandler,
    inputBlurHandler: nickNameBlurHandler,
    clearHandler: nickNameClearHandler,
  } = useInput(validateNickNameLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
    nickNameClearHandler();
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    // 닉네임 중복 체크 해야됨

    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError ||
      nickName
    )
      return;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0 ||
      nickName.length === 0
    )
      return;

    const newUser: NewUser = {
      name,
      email,
      password,
      nickName,
    };

    console.log("NEW USER: ", newUser);
    clearForm();
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
            value={nickName}
            onChange={nickNameChangeHandler}
            onBlur={nickNameBlurHandler}
            error={nickNameHasError}
            helperText={nickNameHasError ? "4 - 16 characters required" : ""}
            type="text"
            name="nickName"
            id="nickName"
            variant="outlined"
            size="small"
          />

          <Button
            variant="contained"
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#f0c14b",
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
            to="/signin"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            Sign-in
          </Link>
        </small>
      </div>
    </Box>
  );
};

export default RegisterComponent;
