const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const Papa = require("papaparse");
const assignSantaChild = require("./assignSantaChild");
const databaseConnection = require("./database");

const app = express();

app.use(cors());
// Multer to store files temporarily
const upload = multer({ dest: "uploads/" });

// For file upload, include multer or express raw body if needed
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.post(
  "/secret-santa-game/backend/employee",
  upload.fields([
    { name: "currentFile", maxCount: 1 },
    { name: "previousFile", maxCount: 1 }
  ]),   // <-- if you only need one file for now
  async (req, res) => {
    try {
      // Validate files
      const current = req.files.currentFile?.[0];
      const previous = req.files.previousFile?.[0];

      if (!current && !previous) {
        return res.status(400).send("No files were uploaded.");
      }
      
      let content1 = null, content2 = null, rows1 = null, rows2 = null;
      //const myObj = {};
      const myArr1 = [];
      const myArr2 = [];
      let updatedEmployees = null;

      if (current) {
      const filePath = current.path;
      content1 = fs.readFileSync(filePath, "utf8");

      // Parse CSV
      const parsed = Papa.parse(content1, {
        header: true,
        skipEmptyLines: true
      });

      rows1 = parsed.data;

       const today = new Date().toISOString().split("T")[0];
       
       //console.log(rows)
       //let index = 0;
       rows1.map((row,index) => {
       // let myInd = index;
        //index++;
        let empCode = "EMP" + String(index+1).padStart(4, "0");        
        const myObj = {
          Employee_Name: row.Employee_Name,
          Employee_EmailID: row.Employee_EmailID,
          Code: empCode,
          Created_date: today
        };
        myArr1.push(myObj);
      });
    }
    
    if (previous) {      
      
        const filePath2 = previous.path;
        content2 = fs.readFileSync(filePath2, "utf8");
        //console.log("Previous file content:", content2);

        // Parse CSV
        const parsed2 = Papa.parse(content2, {
          header: true,
          skipEmptyLines: true
        });

        rows2 = parsed2.data;
         rows2.map((row,index) => {
       // let myInd = index;
        //index++;
                
        const myObj2 = {
          Employee_Name: row.Employee_Name,
          Employee_EmailID: row.Employee_EmailID,
          Santa_Child_EmailID: row.Santa_Child_EmailID
        };
        //console.log(myObj2,'-myObj2')
        myArr2.push(myObj2);
      });
      
    }
    if(myArr1.length > 0){
      if(myArr2.length > 0) {
        myArr1.map((item,index)=>{
        
          const match = myArr2.find(
            (p) => p.Employee_EmailID === item.Employee_EmailID
          );

          if (match) {
            // Assign the matched Santa child email
            myArr1[index].Prev_Santa_Child_EmailID = match.Santa_Child_EmailID;
          } else {
            // No match found
            myArr1[index].Prev_Santa_Child_EmailID = "Not Assigned";
          }
        });

        updatedEmployees = assignSantaChild(myArr1);

      } else{
        // if previous file is empty
        myArr1.map((item,index)=>{
          myArr1[index].Prev_Santa_Child_EmailID = "Not Assigned";
        });
        updatedEmployees = assignSantaChild(myArr1);
      }

      // Insert To DB
    const db = await databaseConnection();
    await db.insertEmployees(updatedEmployees);
    await db.close();
    } 
   //console.log(myArr1); 
   //console.log(myArr2); 
       res.json(updatedEmployees);
      //res.send(myArr);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error while parsing file.");
    }
  }
);

////////////////Code Assignment//////////////////////

app.post(
  "/secret-santa-game/backend/assignment",
  upload.single("assignmentFile"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

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

      return res.json({ message: "Assignments saved successfully!" });

    } catch (err) {
      console.error("Error processing CSV:", err);
      return res.status(500).json({ error: "Failed to parse CSV." });
    }
  }
);
///////////////////////////////////////////////


app.post(
  "/secret-santa-game/backend/assignTask",
  async (req, res) => {
    try {

      const db = await databaseConnection();
      const assignedTasks = await db.assignTask();
      await db.close();
      return res.json({ message: "Task Assigned successfully!", data: assignedTasks });

     }catch (err) {
      console.error("Error :", err);
      return res.status(500).json({ error: "Failed assign" });
    }
  }
);
///////////////////////////////////////////////


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
