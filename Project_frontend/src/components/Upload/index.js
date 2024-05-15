import { useState } from 'react';
import { auth } from '../../utils/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const navigate = useNavigate();
    const userlogin = auth();
    const [filename, setFilename] = useState('');
    const handleUpload = async () => {
        // const res = axios.post('')
        try {
            const res = await axios.post('http://localhost:3000/api/photo/upload', {
                userId: userlogin._id,
                photoName: filename,
            });
            if (res.data.status === 'OK') {
                console.log(res.data.message);
                navigate(`/photos/${userlogin._id}`);
            } else console.log(res.data.message);
        } catch (e) {
            console.log(e);
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
                <div style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', paddingTop: 50 }}>Tải ảnh lên</div>
                <div style={{ marginBottom: 30, marginTop: 40 }}>
                    <span className="indexLogin">Tên File:</span>
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
                        placeholder="Nhập tên file"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
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
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Upload;
