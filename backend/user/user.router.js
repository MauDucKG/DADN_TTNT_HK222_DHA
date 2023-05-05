const  webFramework = require("express");
const router = webFramework.Router();

const UserController = require("./user.controller");

router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.get("/:id/lock", UserController.getUserLocks);
router.post("/", UserController.newuser);
router.post("/login", UserController.login);

module.exports = router;