const  webFramework = require("express");
const router = webFramework.Router();

const UserController = require("./lock.controller");

router.get("/", UserController.getAlllock);
router.get("/:id", UserController.getLockById);
router.post("/", UserController.newlock);

module.exports = router;