const router = require('express').Router();
const { User } = require('../../models');



//api/users
router.get("/", async (req, res) => {
    try {
        const dbUserData = await User.find().select("-__v");
        res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.status(200).json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }  
});




module.exports = router;