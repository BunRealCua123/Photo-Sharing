import React from 'react';
import { Typography, Button, TextField } from '@mui/material';

import './styles.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import models from '../../modelData/models';
import kenobi1 from '../../images/kenobi1.jpg';
import kenobi2 from '../../images/kenobi2.jpg';
import kenobi3 from '../../images/kenobi3.jpg';
import kenobi4 from '../../images/kenobi4.jpg';
import ludgate1 from '../../images/ludgate1.jpg';
import malcolm1 from '../../images/malcolm1.jpg';
import malcolm2 from '../../images/malcolm2.jpg';
import ouster from '../../images/ouster.jpg';
import ripley1 from '../../images/ripley1.jpg';
import ripley2 from '../../images/ripley2.jpg';
import took1 from '../../images/took1.jpg';
import took2 from '../../images/took2.jpg';
import { Link } from 'react-router-dom';
import { auth, loginuser } from '../../utils/auth';
import axios from 'axios';

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const user = useParams();
    const id = user.userId;
    const userlogin = auth();
    //Lấy dữ liệu từ server
    const [users, setUsers] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [cmt, setCmt] = useState('');
    const [render, setRender] = useState(false);
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // const Http = "https://w7wttj-3000.csb.app/api/photo/" + id;
                const response = await fetch(`http://localhost:3000/api/photo/${id}`);
                const result = await response.json();
                setPhotos(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPhotos();
    }, [render]);
    // console.log("id", users);
    const handleChange = (e) => {
        setCmt(e.target.value);
    };

    // console.log('cmtcmt', cmt);
    const newComment = (photo) => {
        const handleClick = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:3000/api/comment/add',
                    {
                        photoId: photo._id,
                        userId: userlogin._id,
                        comment: cmt,
                    },
                    // {
                    //     headers: {
                    //         bearer: `Bearer ${userlogin.token}`,
                    //     },
                    // },
                );
                if (res.data.status === 'ERR') {
                    console.log(res.data.message);
                } else {
                    console.log(res.data.message);
                    setRender(!render);
                }
                console.log(photo._id, userlogin._id, cmt, userlogin.token);
            } catch (e) {
                console.log(e);
            }
        };
        if (userlogin) {
            return (
                <>
                    <div className="newcomment" style={{ marginTop: 20, marginBottom: 20 }}>
                        <input
                            name={photo.id}
                            type="text"
                            style={{
                                outline: 'none',
                                width: 400,
                                borderRadius: 10,
                                padding: '7px 7px 7px 10px',
                                fontSize: 16,
                                border: '1px solid rgb(224, 224, 224)',
                            }}
                            placeholder="Nhập comment"
                            // value={cmt}
                            onChange={handleChange}
                        />
                        <Button onClick={handleClick}>Submit</Button>
                    </div>
                </>
            );
        } else {
            return (
                <div>
                    <p>Log in to add a comment</p>
                </div>
            );
        }
    };

    const userLink = (user) => {
        const fullname = user ? user.first_name + ' ' + user.last_name : '';
        // return fullname;
        return <Link to={'/users/' + user._id}>{fullname}</Link>;
    };
    const photoComment = (comments) => {
        // console.log(comments);
        let formattedComments = [];
        if (comments) {
            formattedComments = comments.map((comment) => (
                <div className="userPhotos-comment">
                    {/* <Link to={"/users/" + comment.user_id}>Hello</Link> */}
                    {userLink(comment.user)}
                    {':\t' + comment.comment}
                    <br />
                    <div style={{ color: 'rgb(128, 128, 128)' }}>
                        {'---\t'}
                        {'At:\t'}
                        {comment.date_time}
                    </div>
                </div>
            ));
        }

        return <div className="userPhotos-comments">{formattedComments}</div>;
    };
    return (
        <div className="userPhotos">
            <Typography variant="h5">PHOTOS</Typography>
            <div>
                {photos.map((ob) => (
                    <div key={ob._id}>
                        <img style={{ width: '100%', height: 'auto' }} src={require(`../../images/${ob.file_name}`)} />
                        <br />
                        <b>Date:</b> {ob.date_time}
                        <br />
                        <b>Comment:</b>
                        {photoComment(ob.comments)}
                        {newComment(ob)}
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserPhotos;
