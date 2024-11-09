import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/auth";
import { fetchRegister } from "../redux/slices/auth";
import { Stack } from "@mui/material";

export default function SignInSide() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = (values) => {
    const data = dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("Не удалось зарегестрироваться");
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
        Регестрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} method="post" action="#">
        <Stack spacing={2}>
          <TextField
            error={Boolean(errors.username?.message)}
            helperText={errors.username?.message}
            {...register("username", {
              required: "Укажите имя пользователя",
            })}
            id="standard-basic"
            label="Username"
            variant="standard"
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
            variant="standard"
          />

          <Button type="submit" variant="contained">
            Зарегестрироваться
          </Button>
        </Stack>
      </form>
      <Button
        sx={{
          mt: 5,
        }}
        LinkComponent={NavLink}
        to="/login"
        variant="outlined"
        size="small"
      >
        Войти
      </Button>
    </Box>
  );
}
