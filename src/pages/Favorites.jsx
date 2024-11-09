import React from "react";
import RouteCard from "../components/RouteCard.jsx";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../redux/slices/route.js";
const Favorites = () => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const { routes } = useSelector((state) => state.routes);
  const isRoutesLoading = routes.status === "loading";
  React.useEffect(() => {
    dispatch(fetchRoutes());
  }, []);
  const filteredRoutes = routes.items.filter(
    (e) => userData?._id === e.user._id
  );
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-8">
      {(isRoutesLoading ? [...Array()] : filteredRoutes).map((obj, index) =>
        isRoutesLoading ? (
          <div></div>
        ) : (
          <RouteCard
            id={obj._id}
            title={obj.title}
            description={obj.description}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={3}
            user={obj.user}
            logo={obj.logo}
            isEditable={userData?._id === obj.user._id}
          />
        )
      )}
    </div>
  );
};

export default Favorites;
