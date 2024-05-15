import { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        location: '',
        description: '',
        occupation: '',
    });
    // console.log('user', user);
    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/user/register', user);
            if (res.data.status === 'OK') {
                console.log(res.data.message);
                navigate('/login');
            } else console.log(res.data.message);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div
            style={{
                marginTop: 100,
                height: 1000,
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                fontFamily: 'sans-serif',
                fontSize: 16,
                // backgroundColor: 'rgb(88, 193, 27)',
                // alignContent: 'center',
            }}
        >
            <div
                style={{
                    width: 600,
                    height: 800,
                    backgroundColor: 'rgb(250, 250, 250)',
                    marginTop: 20,
                    // border: '1px solid rgb(224, 224, 224)',
                    borderRadius: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'rgba(190, 190, 190, 0.489) 0px 2px 12px',
                }}
            >
                <div style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', paddingTop: 20 }}>Đăng ký</div>
                <div style={{ marginBottom: 30, marginTop: 60 }}>
                    <span className="indexLogin">Username:</span>
                    <input
                        className="inputRegister"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <span className="indexLogin">Password:</span>
                    <input
                        name="password"
                        className="inputRegister"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <span className="indexLogin">Confirm Password:</span>
                    <input
                        name="confirmPassword"
                        className="inputRegister"
                        type="password"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <span className="indexLogin">First Name:</span>
                    <input
                        name="first_name"
                        className="inputRegister"
                        placeholder="First Name"
                        value={user.first_name}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <span className="indexLogin">Last Name:</span>
                    <input
                        name="last_name"
                        className="inputRegister"
                        placeholder="Last Name"
                        value={user.last_name}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <span style={{ width: 100 }} className="indexLogin">
                        Location:
                    </span>
                    <input
                        name="location"
                        className="inputRegister"
                        placeholder="Location"
                        value={user.location}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <span className="indexLogin">Description:</span>
                    <input
                        name="description"
                        className="inputRegister"
                        placeholder="Description"
                        value={user.description}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: 30 }}>
                    <span className="indexLogin">Occupation:</span>
                    <input
                        name="occupation"
                        className="inputRegister"
                        placeholder="Occupation"
                        value={user.occupation}
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
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
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>
                {/* <div style={{ textAlign: 'center', marginTop: 40 }}>
                    Chưa có tài khoản?
                    <Link to={'/signup'} style={{ color: 'blueviolet' }}>
                        Tạo tài khoản
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

export default Register;
