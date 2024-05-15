const express = require('express');
const Photo = require('../db/photoModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth');

router.post('/', async (request, response) => {});

router.post('/add', async (request, response) => {
    try {
        const photoId = request.body.photoId;
        const comment = request.body.comment;
        const userId = request.body.userId;
        const photo = await Photo.findOne({ _id: photoId }).exec();
        if (!photo) {
            return response.status(404).json({
                status: 'ERR',
                message: 'Không tìm thấy ảnh',
            });
        }
        const newComment = {
            comment: comment,
            date_time: Date.now(),
            user_id: userId,
        };

        photo.comments.push(newComment);

        await photo.save();
        response.status(200).json({
            status: 'OK',
            message: 'Comment thành công',
        });
    } catch (err) {
        response.status(500).send({
            status: 'ERR',
            message: err,
        });
    }
});

module.exports = router;
