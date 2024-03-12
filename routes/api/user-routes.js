const router = require('express').Router();
const { User } = require('../../models');



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


module.exports = router;