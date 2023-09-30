"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/axios-instance";
import axios from "axios";
import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
const defaultTheme = createTheme();

export default function SignIn() {
  const [state, setState] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const login = data.get("login");
    const password = data.get("password");
    const repeatedPassword = data.get("repeat-password");
    const rememberMe = data.get("remember-me"); //true or null
    //check data validity

    if (state == "LOGIN") {
      console.log("login");
      //handle login using email and password
      //store httponly cookie
      axiosInstance
        .post(
          "/auth/login",
          {
            username: login,
            password: password,
          },
          {
            withCredentials: true,
            
          }
        )
        .then((res: any) => {
          console.log("login fullfiled");
          console.log(res.data.msg);
          
          router.replace("/home");
        })
        .catch((err: any) => {
          if(!err.response){
            setIsProcessing(false);
            setSnackbarMessage("Serwer nie odpowiada");
            return;
          }

            setIsProcessing(false);
            setSnackbarMessage("Podano niepoprawny login bądź hasło");
            return;
    });
    } else {
      //handle account creation using email,login,password and repeatedPassword
      if (password != repeatedPassword) {
        setSnackbarMessage("Hasła nie są takie same");
        return;
      }
      axiosInstance
        .post(
          "/auth/login",
          {
            email: email,
            username: login,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          router.push("/home");
        })
        .catch((err: any) => {
          console.log(err);
          setSnackbarMessage("Konto o podanym loginie lub emailu już istnieje");
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {state == "LOGIN" ? "Zaloguj się" : "Zarejestruj się"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            {state == "REGISTER" ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            ) : (
              <></>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete={state == "LOGIN" ? "current-password" : ""}
            />
            {state == "REGISTER" ? (
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeat-password"
                label="Repeat password"
                type="password"
                id="repeat-password"
              />
            ) : (
              <></>
            )}

            <FormControlLabel
              control={<Checkbox value={true} color="primary" />}
              style={{ display: state == "REGISTER" ? "none" : "block" }}
              label="Zapamiętaj mnie"
              id="remember-me"
              name="remember-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {state == "LOGIN" ? "Zaloguj się" : "Register"}
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Typography
                  variant="body2"
                  onClick={() =>
                    state == "LOGIN" ? setState("REGISTER") : setState("LOGIN")
                  }
                >
                  {state == "LOGIN" ? (
                    <>
                      Nie masz konta?{" "}
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Zarejestruj się
                      </span>
                    </>
                  ) : (
                    <>
                      Masz konto?{" "}
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Zaloguj się
                      </span>
                    </>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Backdrop

        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
        >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </ThemeProvider>
  );
}
