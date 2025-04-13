import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="user-detail-card">
      <CardContent>
        <Typography variant="h4" component="h1">
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Location: {user.location}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          Occupation: {user.occupation}
        </Typography>

        <Typography variant="body1" paragraph>
          {user.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          component={Link}
          to={`/photos/${user._id}`}
          variant="contained"
          color="primary"
        >
          View Photos
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserDetail;
