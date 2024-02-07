import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";

const RegisterComponent: FC = () => {
  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: "#cccccc",
        width: "350px",
        marginTop: 2,
      }}
    >
      <form>
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
            type="password"
            name="password"
            id="password"
            variant="outlined"
            size="small"
          />
          <Button>BB</Button>
          <Divider></Divider>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterComponent;
