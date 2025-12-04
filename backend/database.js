const mysql = require("mysql2/promise");

async function databaseConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "santa_game_db"
  });

  console.log("DB Connected!");


/// Insert Employees ///
async function insertEmployees(employees) {
  console.log("INSERTING EMPLOYEES...");

  const currentYear = new Date().getFullYear();

  //Insert all employees first
  const insertedMap = {}; // 

  for (const emp of employees) {
    const [result] = await connection.execute(
      `INSERT INTO employee 
      (employee_code, employee_name, employee_emailId, employee_status, created_date)
      VALUES (?, ?, ?, 'A', ?)`,
      [emp.Code, emp.Employee_Name, emp.Employee_EmailID, emp.Created_date]
    );

    const empId = result.insertId;

    insertedMap[emp.Employee_EmailID] = empId; // store id for later
  }

  console.log("All employees inserted");
  console.log("Employee Map:", insertedMap);

  // Insert matchups (now FK will succeed)
  for (const emp of employees) {
    const employeeId = insertedMap[emp.Employee_EmailID];
    const childEmail = emp.Santa_Child_Email;

    // Check if child email exists in employee table map
    if (!insertedMap[childEmail]) {
      console.log(`⚠ Child email NOT in employee list:`, childEmail);
      continue;
    }

    await connection.execute(
      `INSERT INTO santa_child_matchup 
      (employee_id, child_employee_emailId, current_year)
      VALUES (?, ?, ?)`,
      [employeeId, childEmail, currentYear]
    );

    console.log(`Matchup inserted: ${emp.Employee_EmailID} - ${childEmail}`);
  }

  console.log("DONE: Employees + Matchups inserted successfully!");
}

/// Insert Assignment ///
async function insertAssignment(assignments) {
  console.log(assignments);

  const sql = `
    INSERT INTO assignment 
      (assignment_code, assignment, assignment_status, current_year, created_date)
    VALUES (?, ?, 'A', ?, ?)
  `;

  try {
    for (const row of assignments) {
      // Ensure no undefined values are passed
      const assignmentCode = row.assignmentCode ?? null;
      const assignment = row.assignment ?? null;
      const currentYear = row.current_year ?? null;
      const createdDate = row.created_date ?? null;

      if (!assignmentCode || !assignment || !currentYear || !createdDate) {
        console.warn("Skipping row due to missing values:", row);
        continue;
      }

      await connection.execute(sql, [
        assignmentCode,
        assignment,
        currentYear,
        createdDate
      ]);
    }

    console.log("Assignments inserted successfully!");
  } catch (err) {
    console.error("Error inserting assignments:", err);
    throw err;
  }
}



/// Assign Task ///
async function assignTask() {
  try {
    const currentYear = new Date().getFullYear();
    const today = new Date().toISOString().split("T")[0];

    // Fetch santa-child matchups
    const [matchups] = await connection.execute(
      `SELECT matchup_id, employee_id, child_employee_emailId 
       FROM santa_child_matchup 
       WHERE current_year = ?`,
      [currentYear]
    );

    if (matchups.length === 0) {
      throw new Error("No santa-child matchups found for current year.");
    }

    // Fetch all active assignments
    const [assignments] = await connection.execute(
      `SELECT assignment_id, assignment_code, assignment
       FROM assignment
       WHERE current_year = ? AND assignment_status = 'A'`,
      [currentYear]
    );

    if (assignments.length < 3) {
      throw new Error("Not enough assignments available (minimum 3 required).");
    }

    // Function to get 3 random assignments
    function getRandomTasks() {
      const shuffled = [...assignments].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 3);
    }

    const finalAssignedList = [];

    // Insert tasks for each matchup
    for (const row of matchups) {
      const randomTasks = getRandomTasks();

      for (const task of randomTasks) {
        await connection.execute(
          `INSERT INTO committed_assignment 
            (employee_id, assignment_id, created_date)
           VALUES (?, ?, ?)`,
          [row.employee_id, task.assignment_id, today]
        );
      }

      finalAssignedList.push({
        santa_employee_id: row.employee_id,
        child_email: row.child_employee_emailId,
        assigned_tasks: randomTasks,
      });
    }

    console.log("Task assignment completed successfully.");
    return finalAssignedList;

  } catch (err) {
    console.error("Error in assignTask():", err);
    throw err;
  }
}


/// Get Employees ///
async function getEmployees() {
  try {
    const [rows] = await connection.execute(
      `SELECT id, employee_code, employee_name, employee_emailId, employee_status
       FROM employee
       ORDER BY employee_name ASC`
    );

    return rows;

  } catch (err) {
    console.error("Error fetching employees:", err);
    throw err;
  }
}



/// Get assignment list ///
async function getAssignments() {
  try {
    const currentYear = new Date().getFullYear();

    const [rows] = await connection.execute(
      `SELECT assignment_id, assignment_code, assignment, assignment_status
       FROM assignment
       WHERE current_year = ?
       ORDER BY assignment_code ASC`,
      [currentYear]
    );

    return rows;

  } catch (err) {
    console.error("Error fetching assignments:", err);
    throw err;
  }
}


/// Get task list ///
async function getTaskList() {
  try {
    const currentYear = new Date().getFullYear();

    // Get all santa-child matchups
    const [matchups] = await connection.execute(
      `SELECT matchup_id, employee_id, child_employee_emailId 
       FROM santa_child_matchup 
       WHERE current_year = ?`,
      [currentYear]
    );

    if (matchups.length === 0) {
      throw new Error("No santa-child matchups found for the current year.");
    }

    const finalAssignedList = [];

    for (const row of matchups) {
      const tasks = await getTasksDetails(row.child_employee_emailId);
      const employee = await getEmployeeDetails(row.employee_id);

      finalAssignedList.push({
        employee: employee[0].employee_name,
        employee_id: row.employee_id,
        child_email: row.child_employee_emailId,
        assigned_tasks: tasks,      // array or comma-separated string
      });
    }

    console.log("Task list fetched successfully.");
    return finalAssignedList;

  } catch (err) {
    console.error("Error fetching assignments:", err);
    throw err;
  }
}


async function getEmployeeDetails(id) {
  // Get child employee_id
  const [empRows] = await connection.execute(
    `SELECT employee_name
     FROM employee
     WHERE id = ?`,
    [id]
  );
  return empRows; 
}
async function getTasksDetails(childEmail) {
  const currentYear = new Date().getFullYear();

  // Get child employee_id
  const [childRows] = await connection.execute(
    `SELECT id
     FROM employee
     WHERE employee_emailId = ?`,
    [childEmail]
  );

  if (childRows.length === 0) return [];

  const childEmployeeId = childRows[0].id;

  // Get committed assignments
  const [committed] = await connection.execute(
    `SELECT assignment_id 
     FROM committed_assignment
     WHERE employee_id = ?`,
    [childEmployeeId]
  );

  if (committed.length === 0) return [];

  const assignmentIds = committed.map(r => r.assignment_id);

  const assignedTasks = [];

  //Fetch assignment details one by one
  for (const id of assignmentIds) {
    const [rows] = await connection.execute(
      `SELECT assignment_id, assignment_code, assignment
       FROM assignment
       WHERE assignment_id = ?`,
      [id]
    );

    if (rows.length > 0) {
      assignedTasks.push({
        id: rows[0].assignment_id,
        code: rows[0].assignment_code,
        task: rows[0].assignment,
      });
    }
  }

  return assignedTasks;  // returns array of assignments
 // return assignedTasks.map(a => a.code).join(",");
}


// Close DB connection
async function close() {
  await connection.end();
  console.log("DB Closed!");
}

  // Return usable methods
  return {
    insertEmployees,
    insertAssignment,
    assignTask,
    getEmployees,
    getAssignments,
    getTaskList,
    close
  };
}

module.exports = databaseConnection;
