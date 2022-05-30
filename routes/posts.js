const router = require("express").Router();
const { restart } = require("nodemon");
const Post = require("../models/Post");

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne();
            return res.status(200).json("編集完了");
        } else {
            return res.status(403).json("勝手に他人を編集してはいけません");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne({
                $set: req.body,
            });
            return res.status(200).json("削除しました");
        } else {
            return res.status(403).json("勝手に人のものを消してはいけません");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});
module.exports = router;
