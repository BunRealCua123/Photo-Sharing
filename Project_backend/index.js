// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./db/dbConnect');
const PORT = 3000;
const models = require('./modelData/models');
const dbLoad = require('./db/dbLoad');
const UserRouter = require('./routes/userRouter');
const PhotoRouter = require('./routes/photoRouter');
const CommentRouter = require('./routes/commentRouter');

dbConnect();
//  dbLoad();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/user', UserRouter);
app.use('/api/photo', PhotoRouter);
app.use('/api/comment', CommentRouter);
app.get('/', (req, res) => {
    res.send('hello');
});

// app.get("/test/info", (req, res) => {
//   res.json(models.schemaModel());
// });
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
// app.get("/photosOfUser/:id", (req, res) => {
//   const postId = req.params.id;
//   const photos = models.photoOfUserModel(postId);
//   if (!photos) {
//     return res.status(404).json({ error: "Nguời dùng không có ảnh" });
//   }
//   res.json(photos);
// });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
