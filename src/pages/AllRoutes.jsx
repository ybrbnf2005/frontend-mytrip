import React from "react";
import RouteCard from "../components/RouteCard.jsx";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../redux/slices/route.js";
const AllRoutes = () => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const { routes } = useSelector((state) => state.routes);
  const isRoutesLoading = routes.status === "loading";
  React.useEffect(() => {
    dispatch(fetchRoutes());
  }, []);
  return isRoutesLoading ? (
    <CircularProgress />
  ) : (
    routes.items.map((obj) => (
      <RouteCard
        key={obj._id}
        id={obj._id}
        title={obj.title}
        description={obj.description}
        createdAt={obj.createdAt}
        viewsCount={obj.viewsCount}
        commentsCount={3}
        user={obj.user}
        logo={obj.logo}
      />
    ))
  );
};

export default AllRoutes;
