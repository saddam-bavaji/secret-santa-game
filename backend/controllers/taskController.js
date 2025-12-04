const databaseConnection = require("../database");

exports.assignTask = async (req, res) => {
  try {
    console.log("Assign Task endpoint hit!");

   const db = await databaseConnection();
      const assignedTasks = await db.assignTask();
      await db.close();
    res.json({ message: "Task Assigned successfully!", data: assignedTasks });
 
 

  } catch (err) {
    console.error("Assign task error:", err);
    res.status(500).json({ message: "Server error assigning tasks." });
  }
};

exports.getTask = async (req, res) => {
  try {
    const db = await databaseConnection();
    const task = await db.getTaskList();
    await db.close();

    res.json({ data: task });

  } catch (err) {
    console.error("Get Task Error:", err);
    res.status(500).json({ error: "Failed fetching task" });
  }
};
