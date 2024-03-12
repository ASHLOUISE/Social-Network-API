const router = require('express').Router();
const { User, Thought } = require('../../models');


//api/users
//get all users
router.get("/", async (req, res) => {
    try {
        const dbUserData = await User.find().select("-__v");
        return res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//creates a new user
router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }  
});


//api/users/:id
//get a single user by id
router.get("/:id", async (req, res) => {
    try {
        const dbUserData = await User.findOne({ _id: req.params.id })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
        if (!dbUserData) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put("/:id", async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);


router.delete("/:id", async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
        if (!dbUserData) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        await Thought.deleteMany({ userId: req.params.id });

        res.status(200).json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//api/users/:id/friends/:friendId

router.post("/:id/friends/:friendId", async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        const dbFriendData = await User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { friends: req.params.id } },
            { runValidators: true, new: true }
        );
        if (!dbFriendData) {
            return res.status(404).json({ message: "No friend found with this id!" });
        }
        res.status(200).json({ message: "Friend added!" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

router.delete("/:id/friends/:friendId", async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: "No user found with this id!" });
        }
        const dbFriendData = await User.findOneAndDelete(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.id } },
            { runValidators: true, new: true }
        );
        if (!dbFriendData) {
            return res.status(404).json({ message: "No friend found with this id!" });
        }
        res.status(200).json({ message: "Friend deleted!" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);



module.exports = router;
