const router = require('express').Router();
const { User, Thought } = require('../../models');


router.get("/", async (req, res) => {
    try {
        const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
        return res.status(200).json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        );
        if (!dbUserData) {
            return res.status(404).json({ message: "Thoughts created but no user with this id!" });
        }
        res.status(200).json({ ...dbThoughtData, message: "Thoughts created and user updated!" });
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOne({ _id: req.params.id });
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put("/:id", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.id });
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.status(200).json({ message: "Thought deleted!" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.status(200).json(dbThoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
