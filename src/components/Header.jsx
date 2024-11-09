import * as React from "react";
// import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
// import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MapIcon from "@mui/icons-material/Map";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/auth";
import { Button, Link } from "@mui/material";
function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = async () => {
    await dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MapIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Link
            component={NavLink}
            color="inherit"
            variant="body2"
            to="/"
            sx={{ p: 1, flexShrink: 0 }}
          >
            Маршруты
          </Link>
          <Link
            component={NavLink}
            color="inherit"
            variant="body2"
            to="/reviews"
            sx={{ p: 1, flexShrink: 0 }}
          >
            Отзывы
          </Link>
          {isAuth ? (
            <>
              <Link
                component={NavLink}
                color="inherit"
                variant="body2"
                to="/create"
                sx={{ p: 1, flexShrink: 0 }}
              >
                Создать
              </Link>
              <Link
                component={NavLink}
                color="inherit"
                variant="body2"
                to="/favorites"
                sx={{ p: 1, flexShrink: 0 }}
              >
                Мои маршруты
              </Link>
            </>
          ) : (
            <></>
          )}
          {isAuth ? (
            <Button variant="contained" onClick={onClickLogout}>
              Выход
            </Button>
          ) : (
            <Link
              component={NavLink}
              variant="body2"
              to="/login"
              sx={{ p: 1, color: "white", flexShrink: 0 }}
            >
              Вход
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
