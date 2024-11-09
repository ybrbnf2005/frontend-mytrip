import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, fetchRemoveReview } from "../redux/slices/review.js";
import Avatar from "@mui/material/Avatar";
import { DeleteForever } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const Reviews = () => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);
  const isReviewsLoading = reviews.status === "loading";
  React.useEffect(() => {
    dispatch(fetchReviews());
  }, []);
  const onClickRemove = (obj) => {
    dispatch(fetchRemoveReview(obj._id));
  };
  return (
    <Stack spacing={5} mt={10}>
      {isReviewsLoading ? (
        <CircularProgress />
      ) : (
        reviews.items.map((obj) => (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h2">{obj.dataForReview[0]}</Typography>
            <Typography variant="h5">{obj.textReview}</Typography>

            <Typography variant="h5">{obj.user.username}</Typography>

            <Typography variant="h5">Автор маршрута: {obj.dataForReview[1]}</Typography>

            <Button LinkComponent={NavLink} variant="contained" to={`/route/${obj.dataForReview[2]}`}>Посмотреть</Button>

            {userData?.username === obj.user.username && (
              <IconButton
                color="primary"
                sx={{ "&:hover": { color: "green" } }}
              >
                <DeleteForever
                  onClick={() => {
                    onClickRemove(obj);
                  }}
                />
              </IconButton>
            )}
          </Paper>
        ))
      )}
    </Stack>
  );
};

export default Reviews;
