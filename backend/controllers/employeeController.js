const databaseConnection = require("../database");
const fs = require("fs");
const Papa = require("papaparse");
const assignSantaChild = require("../assignSantaChild");

exports.uploadEmployees = async (req, res) => {
  try {
    const current = req.files.currentFile?.[0];
    const previous = req.files.previousFile?.[0];

    if (!current || !previous) {
      return res.status(400).json({ error: "Both files are required." });
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

    res.json({
      message: "Employees uploaded successfully.",
      employee: updatedEmployees,
      files: { 
        currentFile: current.filename,
        previousFile: previous.filename,
      },
    });
  } catch (err) {
    console.error("Employee upload error:", err);
    res.status(500).json({ message: "Server error uploading employees." });
  }
};


exports.getEmployees = async (req, res) => {
  try {
    const db = await databaseConnection();
    const employees = await db.getEmployees();
    await db.close();

    res.json({ data: employees });

  } catch (err) {
    console.error("Get Employees Error:", err);
    res.status(500).json({ error: "Failed fetching employees" });
  }
};

