const express = require("express");
const protectRoute = require("../middlewares/protectRoute.js");

const {
    
    signupUser,
    testRoute,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    getUserProfile,
    freezeAccount,

} = require("../controllers/userController.js");

const router = express.Router();

router.get("/test", testRoute);
router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

module.exports = router;

