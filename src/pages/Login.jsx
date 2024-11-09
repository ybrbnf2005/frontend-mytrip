import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/auth";
import { Link, Stack } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        mt: 35,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <form
        method="post"
        action="#"
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <TextField
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            {...register("username", {
              required: "Укажите имя пользователя",
            })}
            id="standard-basic"
            label="Username"
            variant="outlined"
            sx={{ mt: 4 }}
          />
          <TextField
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Укажите пароль",
            })}
            sx={{ mt: 6 }}
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
          />

          <Button variant="contained" type="submit">
            Войти
          </Button>
        </Stack>
      </form>
      <Button
        sx={{ mt: 5 }}
        LinkComponent={NavLink}
        variant="outlined"
        to="/register"
      >
        Зарегестрироваться
      </Button>
    </Box>
  );
}
