import React, {useState,useEffect} from 'react';
import Papa from "papaparse";
import axios from "axios";
import TaskList from "./List/TaskList";

function AssignmentMatchup() {
	
	const [jsonData, setJsonData] = useState(null);
	const [assignmentFile, setassignmentFile] = useState(null);
		 
	 const triggerViewMatchup = async () => {
		  
	 
	  try {
		const response = await axios.post(
		  "http://localhost:5000/secret-santa-game/backend/assignTask",{},
		  { headers: { "Content-Type": "multipart/form-data" } }
		);

		//console.log("Server Response:", response.data);
		 alert(response.data.message);

	  } catch (error) {
		console.error("Upload error:", error);
	  }
	};
	
  return (
    <div className="App" style={{marginLeft: '25px'}}>
		<div>
			<h2>Assignment Matchup</h2>
			<button onClick={triggerViewMatchup}>Assign Task</button>	
		</div>
		
		<TaskList />
		
    </div>
  );
}

export default AssignmentMatchup;
