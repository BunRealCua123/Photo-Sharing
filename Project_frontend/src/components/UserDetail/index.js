import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider, Typography, Button } from "@material-ui/core";
import "./styles.css";
// import models from '../../modelData/models';

function UserDetail() {
  const user1 = useParams();
  //Lấy dữ liệu từ server
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/list`
        );
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);
  //Lấy dữ liệu từ server
  // console.log(typeof user1);
  // const id = user1.useId;
  let user = {};
  if (users) {
    for (let i = 0; i < users.length; i++) {
      const user2 = users[i];
      const userid = user2._id;
      const Id = user1.userId;
      // console.log(typeof user2, userid, user1.userId);
      if (userid === user1.userId) {
        user = user2;
        // console.log(10000);
      }
    }
  }
  // console.log(user);
  // const user = models.userModel(user1.userId);

  const fullname = user ? user.first_name + " " + user.last_name : "";
  return (
    <div className="userDetail">
      <Typography variant="h5">{fullname} </Typography>
      <Typography variant="subtitle1">{user.location}</Typography>
      <Typography variant="body1">
        <b>Occupation:</b> {user.occupation}
      </Typography>
      <Typography variant="body1">
        <b className="userDetail-description">Description: </b>
        <span
          className="userDetail-description"
          dangerouslySetInnerHTML={{ __html: user ? user.description : "" }}
        />
      </Typography>
      <Divider />
      <Button component={RouterLink} to={"/photos/" + user._id}>
        Photos
      </Button>
    </div>
  );
}

export default UserDetail;
