import { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loginuser } from '../../utils/auth';
import axios from 'axios';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    console.log(username, password);
    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/user/login`, {
                username: username,
                password: password,
            });
            console.log('response', response);
            if (response.data.status === 'SUCCESS') {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                navigate(`/users/${response.data.data._id}`);
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };
    return (
        <div
            style={{
                marginTop: 100,
                height: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'sans-serif',
                fontSize: 16,
                // backgroundColor: 'rgb(88, 193, 27)',
                // alignContent: 'center',
            }}
        >
            <div
                style={{
                    width: 500,
                    height: 400,
                    backgroundColor: 'rgb(250, 250, 250)',
                    // border: '1px solid rgb(224, 224, 224)',
                    borderRadius: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'rgba(190, 190, 190, 0.489) 0px 2px 12px',
                }}
            >
                <div style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', paddingTop: 20 }}>Đăng nhập</div>
                <div style={{ marginBottom: 30, marginTop: 60 }}>
                    <span className="indexLogin">Tài khoản:</span>
                    <input
                        type="text"
                        style={{
                            outline: 'none',
                            width: 280,
                            borderRadius: 10,
                            padding: '7px 7px 7px 10px',
                            fontSize: 16,
                            border: '1px solid rgb(224, 224, 224)',
                        }}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <span className="indexLogin">Mật khẩu:</span>
                    <input
                        type="password"
                        style={{
                            outline: 'none',
                            width: 280,
                            borderRadius: 10,
                            marginLeft: 5,
                            padding: '7px 7px 7px 10px',
                            fontSize: 16,
                            border: '1px solid rgb(224, 224, 224)',
                        }}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button
                        style={{
                            marginTop: 30,
                            width: 170,
                            height: 40,
                            borderRadius: 10,
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: 20,
                            backgroundColor: 'rgb(88, 193, 27)',
                            color: 'white',
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    Chưa có tài khoản?
                    <Link to={'/signup'} style={{ color: 'blueviolet' }}>
                        Tạo tài khoản
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
