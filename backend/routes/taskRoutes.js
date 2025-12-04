const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.assignTask);

router.get("/list", taskController.getTask);

module.exports = router;
