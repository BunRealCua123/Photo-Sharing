const express = require('express');
const User = require('../db/userModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
// app.get("/user/list", (req, res) => {
//   res.json(models.userListModel());
// });

// app.get("/user/:id", (req, res) => {
//   const postId = req.params.id;
//   const post = models.userModel(postId);
//   if (!post) {
//     return res.status(404).json({ error: "Nguời dùng không tồn tại" });
//   }
//   res.json(post);
// });
router.get('/list', async (request, response) => {
    try {
        const listUser = await User.find();
        response.status(200).json(listUser);
    } catch (e) {
        response.status(404).json({ message: e });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const postId = request.params.id;
        const detailUser = await User.findOne({ _id: postId });
        response.status(200).json(detailUser);
    } catch (e) {
        response.status(404).json({ message: e });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(200).json({
                status: 'ERR',
                message: 'Điền đầy đủ thông tin',
            });
        }
        const loginUser = await User.findOne({ username: username, password: password });
        if (!loginUser) {
            res.status.json({
                status: 'ERR',
                message: 'Tài khoản, mật khẩu chưa chính xác',
            });
        }
        const token = jwt.sign({ _id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        const data = { _id: loginUser._id, name: loginUser.first_name + ' ' + loginUser.last_name, token: token };
        res.status(200).json({
            status: 'SUCCESS',
            message: 'Đăng nhập thành công',
            data: data,
        });
    } catch (e) {
        res.status(404).json({
            status: 'ERR',
            message: e,
        });
    }
});

router.post('/register', async (req, res) => {
    const { username, password, confirmPassword, first_name, last_name, location, description, occupation } = req.body;
    if (!username || !password || !confirmPassword || !first_name || !last_name) {
        res.status(400).json({ status: 'ERR', message: 'Nhập đầy đủ thông tin' });
    }
    if (password != confirmPassword) {
        res.status(400).json({ status: 'ERR', message: 'Nhập thông tin chưa chính xác' });
    }
    const data = req.body;
    const existingUser = await User.findOne({
        username: username,
    });
    if (existingUser) {
        return res.status(400).json({ status: 'ERR', message: 'Tài khoản đã tồn tại' });
    }
    const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        location: location,
        description: description,
        occupation: occupation,
        username: username,
        password: password,
    });
    // await user.save();
    res.status(200).json({ status: 'OK', message: 'Tạo tài khoản thành công' });
});
module.exports = router;
