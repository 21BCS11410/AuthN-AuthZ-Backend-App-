const express = require('express');
const router = express.Router();

const {signup, login} = require('../controllers/Auth');
const {auth, isStudent, isAdmin} = require("../middlewares/auth")

router.post("/signup", signup);
router.post("/login", login);

//testing protected routes for single middlewares
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected routes for the TESTS",
    });
});

//Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected routes for the students",
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected routes for the admin",
    });
})


module.exports = router;