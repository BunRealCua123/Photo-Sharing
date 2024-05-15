const express = require('express');
const Photo = require('../db/photoModel');
const User = require('../db/userModel');
const router = express.Router();

router.post('/upload', async (request, res) => {
    try {
        const { userId, photoName } = request.body;
        const newPhoto = {
            comments: [],
            date_time: Date.now(),
            user_id: userId,
            file_name: photoName,
        };

        const data = await Photo.create(newPhoto);
        if (!data) {
            res.status(200).json({
                status: 'ERR',
                message: 'Tải ảnh thất bại',
            });
        }
        res.status(200).json({
            status: 'OK',
            message: 'Tải ảnh thành công',
        });
    } catch (err) {
        res.status(500).send({
            status: 'ERR',
            message: err,
        });
    }
});

router.get('/:id', async (request, response) => {
    const user_id = request.params.id;
    try {
        const projection = '_id first_name last_name';
        const userphoto = await User.findOne({ _id: user_id }).select(projection).exec();
        const photos = await Photo.find({ user_id: user_id }).exec();
        const photosWithComments = await Promise.all(
            photos.map(async (photo) => {
                const comments = await Promise.all(
                    photo.comments.map(async (comment) => {
                        const user = await User.findOne({ _id: comment.user_id }).select(projection).exec();
                        return {
                            _id: comment._id,
                            comment: comment.comment,
                            date_time: comment.date_time,
                            user: user,
                        };
                    }),
                );
                return {
                    _id: photo._id,
                    file_name: photo.file_name,
                    date_time: photo.date_time,
                    user: userphoto,
                    comments: comments,
                };
            }),
        );
        response.status(200).send(photosWithComments);
    } catch (err) {
        response.status(500).send(err);
    }
});

module.exports = router;
