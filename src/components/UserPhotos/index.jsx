import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  if (!user || !photos) {
    return <div>Loading...</div>;
  }

  // Định dạng ngày tháng thành chuỗi thân thiện
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="user-photos">
      <Typography variant="h4" component="h1">
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={`Photo by ${user.first_name}`}
            className="photo-image"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Posted on: {formatDate(photo.date_time)}
            </Typography>

            <Typography variant="h6" component="h2" className="comments-header">
              Comments
            </Typography>

            <List>
              {/* Kiểm tra xem photo.comments có tồn tại không và có phải là mảng không */}
              {photo.comments &&
              Array.isArray(photo.comments) &&
              photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <ListItem key={comment._id} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Link to={`/users/${comment.user._id}`}>
                            {comment.user.first_name} {comment.user.last_name}
                          </Link>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            style={{ marginLeft: 10 }}
                          >
                            {formatDate(comment.date_time)}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={comment.comment}
                    />
                    <Divider />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No comments yet" />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
