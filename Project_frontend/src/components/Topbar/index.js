import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import models from '../../modelData/models';
import { auth, logout } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import './styles.css';
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const location = useLocation();
    // const localUser = auth();
    const [localUser, setLocalUser] = useState(auth());
    const id1 = location.pathname.split('/').at(-1);
    // console.log('id1', id1);
    let link1 = location.pathname.split('/').at(-2);
    const handleLogout = () => {
        localStorage.removeItem('user');
        setLocalUser();
        navigate('/');
    };
    const handleUpload = () => {
        // localStorage.removeItem('user');
        // setLocalUser();
        navigate('/upload');
    };
    // console.log(typeof link1);
    // const user = models.userModel(id1);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (id1) {
                    const response = await fetch(`http://localhost:3000/api/user/${id1}`);
                    const result = await response.json();
                    setUser(result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, [id1]);
    // console.log('idday', id1);
    console.log('auth', auth());
    let fullname = user.first_name && user.last_name ? user.first_name + ' ' + user.last_name : '';
    // if(link1==='photos' && !fullname1){
    //   fullname = 'Photos of '+ fullname1;
    // }
    // else if(!fullname1) fullname = fullname1;
    // const fullname = fullname1;
    if (link1) {
        if (link1 === 'photos') fullname = 'Photos of ' + fullname;
    }

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                <div>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
                        <Typography variant="h5" color="inherit" style={{ flex: 1, fontSize: 30 }}>
                            Kiều Hiếu
                        </Typography>
                    </Link>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Typography variant="h5" color="inherit">
                        {fullname}
                    </Typography>
                </div>
            </Toolbar>
            {!auth() ? (
                <Link
                    to={'/login'}
                    style={{
                        color: 'white',
                        margin: 0,
                        paddingLeft: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textDecoration: 'none',
                    }}
                >
                    Đăng nhập
                </Link>
            ) : (
                <div
                    style={{
                        color: 'white',
                        margin: 0,
                        paddingLeft: 20,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textDecoration: 'none',
                    }}
                >
                    User: {auth().name}
                    <button
                        style={{
                            color: 'white',
                            margin: 0,
                            marginLeft: 20,
                            fontSize: 18,
                            padding: 7,
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            backgroundColor: 'gray',
                            borderRadius: 10,
                            // border: '1px solid rgb(250, 250, 250)',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button
                        style={{
                            color: 'white',
                            margin: 0,
                            marginLeft: 50,
                            fontSize: 20,
                            padding: 7,
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            backgroundColor: 'rgb(58, 212, 161)',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: 10,
                        }}
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            )}
        </AppBar>
    );
}

export default TopBar;
