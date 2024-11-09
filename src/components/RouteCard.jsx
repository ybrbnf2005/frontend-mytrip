import * as React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { DeleteForever } from "@mui/icons-material";
import { fetchRemoveRoute } from "../redux/slices/route";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
export const RouteCard = ({
  id,
  title,
  createdAt,
  logo,
  user,
  viewsCount,
  isLoading,
  description,
  isEditable,
  avatarUrl,
}) => {
  const dispatch = useDispatch();
  const onClickRemove = () => {
    dispatch(fetchRemoveRoute(id));
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <Card
      sx={{ maxWidth: 345, height: "500px" }}
      className="relative hover:hover:shadow-[rgb(59,130,246,0.5)] hover:shadow-lg rounded-lg"
    >
      <CardHeader
        avatar={
          user.avatarUrl ? (
            <>
              <Avatar src={user.avatarUrl} />
            </>
          ) : (
            <Avatar aria-label="recipe"></Avatar>
          )
        }
        title={user.username}
        subheader={createdAt.slice(0, createdAt.indexOf("T"))}
      />

      {logo ? (
        <CardMedia
          component="img"
          image={logo}
          alt={title}
          sx={{ maxHeight: "300px" }}
        />
      ) : (
        <CardMedia
          component="img"
          image="https://ic.pics.livejournal.com/flackelf/27869349/2613547/2613547_original.jpg"
          alt={title}
          sx={{ maxHeight: "300px" }}
        />
      )}

      <CardContent>
        <Typography variant="body2" color="primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        className="flex justify-between absolute bottom-0"
      >
        <NavLink to={`/route/${id}`}>
          <Button>Посмотреть</Button>
        </NavLink>
        <div className="flex items-center">
          <RemoveRedEyeIcon color="primary" />
          <span className="text-blue-800">{viewsCount}</span>
        </div>
        {isEditable ? (
          <IconButton aria-label="share">
            <DeleteForever onClick={onClickRemove} />
          </IconButton>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};

export default RouteCard;
