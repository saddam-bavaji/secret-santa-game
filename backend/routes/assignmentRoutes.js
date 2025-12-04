const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const assignmentController = require("../controllers/assignmentController");

router.post("/", upload.single("assignmentFile"), assignmentController.uploadAssignments);

router.get("/list", assignmentController.getAssignments);

module.exports = router;
