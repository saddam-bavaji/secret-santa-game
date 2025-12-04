const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const employeeController = require("../controllers/employeeController");

router.post("/", upload.fields([
    { name: "currentFile", maxCount: 1 },
    { name: "previousFile", maxCount: 1 }
]), employeeController.uploadEmployees);

router.get("/list", employeeController.getEmployees);

module.exports = router;
