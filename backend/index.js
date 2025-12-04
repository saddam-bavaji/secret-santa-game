const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/secret-santa-game/backend/employee", employeeRoutes);
app.use("/secret-santa-game/backend/assignment", assignmentRoutes);
app.use("/secret-santa-game/backend/assignTask", taskRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
