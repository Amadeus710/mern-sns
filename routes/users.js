const User = require("../models/User");

const router = require("express").Router();

// CRUD
//更新
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("更新完了");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("嘘つくな");
    }
});

//削除
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("削除完了");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("アカウントの嘘つくな");
    }
});

//取得
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.get("/", (req, res) => {
//     res.send("user router");
// });

module.exports = router;
