import { React, useState, useEffect } from "react";
import Map from "../components/Map";
import Carousel from "react-material-ui-carousel";
import TextField from "@mui/material/TextField";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "./../axios";
const RouteFull = () => {
  const [route, setRoute] = useState();
  const [textReview, setTextReview] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`route/${id}`)
      .then((res) => {
        setRoute(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении маршрута");
      });
  }, []);
  const onSubmit = async () => {
    try {
      const fields = {
        textReview,
        dataForReview,
      };
      await axios.post("/reviews", fields);
      Navigate(`/reviews`);
    } catch (error) {
      console.warn(error);
    }
    setOpen(false);
  };
  console.log(route);
  return (
    <div>
      <Typography variant="h3">{route?.title}</Typography>

      <Typography variant="h3">{route?.description}</Typography>

      <Carousel navButtonsAlwaysVisible autoPlay={false} swipe={true}>
        {route?.list?.map((item, i) => (
          <Paper sx={{ height: 400 }} elevation={3} key={i} item={item}>
            <Box display={"flex"} alignItems={"center"} p={10}>
              <img width={200} height={200} src={item.imgSrc} alt="" />
              <Box p={10}>
                <Typography variant="h3">{item.title}</Typography>
                <Typography variant="h5">{item.description}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Carousel>
      <Map route={route?.route} />

      <TextField
        value={textReview}
        onChange={(e) => setTextReview(e.target.value)}
        label="Отзыв"
        multiline
        variant="standard"
        sx={{ mt: 4, height: "90%", width: "100%", overflowY: "auto" }}
      />

      <Button onClick={onSubmit}>Отправить</Button>
    </div>
  );
};

export default RouteFull;
