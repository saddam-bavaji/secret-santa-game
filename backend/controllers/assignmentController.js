const databaseConnection = require("../database");
const fs = require("fs");
const Papa = require("papaparse");
exports.uploadAssignments = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Assignment Excel file required" });
    }

    console.log("Assignment File Uploaded:", file.filename);

    const filePath = req.file.path;
      const content = fs.readFileSync(filePath, "utf8");

      const parsed = Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => (h || "").trim(),
      });

      const rows = parsed.data || [];

      const today = new Date().toISOString().split("T")[0];
      const currentYear = new Date().getFullYear();

      const myArr1 = rows.map((row, index) => {
        const assCode = "ASS" + String(index + 1).padStart(4, "0");

        return {
          assignment: row.Assignments,
          assignmentCode: assCode,
          created_date: today,
          current_year: currentYear,
        };
      });

      // DB Insert
      const db = await databaseConnection();
      await db.insertAssignment(myArr1);
      await db.close();

    res.json({
      message: "Assignment file uploaded successfully.",
      filename: file.filename
    });

  } catch (err) {
    console.error("Assignment upload error:", err);
    res.status(500).json({ message: "Server error uploading assignment file." });
  }
};


exports.getAssignments = async (req, res) => {
  try {
    const db = await databaseConnection();
    const assignments = await db.getAssignments();
    await db.close();

    res.json({ data: assignments });

  } catch (err) {
    console.error("Get Assignments Error:", err);
    res.status(500).json({ error: "Failed fetching assignments" });
  }
};