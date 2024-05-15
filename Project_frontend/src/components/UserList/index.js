import React from 'react';
import { Divider, List, Typography } from '@material-ui/core';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';
// import models from '../../modelData/models';
import './styles.css';
import { useState, useEffect } from 'react';
const UserList = () => {
    const getUserList = () => {
        const [users, setUsers] = useState([]);
        //lấy dữ liệu từ server
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    // const response = await fetch(
                    //   "https://w7wttj-3000.csb.app/api/user/list"
                    // );
                    const result = await fetchModel('', '');
                    console.log('result', result);
                    setUsers(result);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchUsers();
        }, []);
        // lấy dữ liệu từ server

        const formattedUserList = [];
        // const users = models.userListModel();
        if (users) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const userid = user._id;

                formattedUserList.push(
                    <ListItem key={i} component={RouterLink} to={'/users/' + userid}>
                        <ListItemText primary={user.first_name + ' ' + user.last_name} />
                    </ListItem>,
                );
                formattedUserList.push(<Divider />);
            }
        } else {
            formattedUserList.push(
                <ListItem key="Error" alignItems="flex-start" justify="center">
                    <ListItemText primary={'Error: List Not Found'} />
                </ListItem>,
            );
            formattedUserList.push(<Divider />);
        }

        return formattedUserList;
    };
    return (
        <div className="userList">
            <Typography variant="h5" className="userListHead">
                Users
            </Typography>
            <List>{getUserList()}</List>
        </div>
    );
};

export default UserList;
