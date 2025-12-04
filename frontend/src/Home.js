import React, {useState,useEffect} from 'react';
import Papa from "papaparse";
import axios from "axios";
import EmployeeList from "./List/EmployeeList";

function Home() {
	
	const [jsonData, setJsonData] = useState(null);
	const [currentFile, setcurrentFile] = useState(null);
	const [previousFile, setpreviousFile] = useState(null);
	const [employeeList, setemployeeList] = useState(null);
		
	const handleFileUpload = (e,r) =>{
		 const file = e.target.files[0];
		 if(r=='current_yr_file'){
			 setcurrentFile(file);
		 } else{
			 setpreviousFile(file);
		 }
		
	 }
	 
	 const handleSubmit = async (e) => {
		  e.preventDefault();
	  const formData = new FormData();
	  formData.append("currentFile", currentFile);
	  formData.append("previousFile", previousFile);

	  try {
		const response = await axios.post(
		  "http://localhost:5000/secret-santa-game/backend/employee",
		  formData,
		  { headers: { "Content-Type": "multipart/form-data" } }
		);

		console.log("Server Response:", response.data.message);
			//setemployeeList(response.message);
			 alert(response.data.message);
	  } catch (error) {
		console.error("Upload error:", error);
	  }
	};

	
  return (
    <div className="App" style={{marginLeft: '25px'}} >
		<h2>Upload Employees Files</h2>
		<form onSubmit={handleSubmit}>
			<div className="curr-file-upload">
				<h2>Current Year</h2>
				<input type="file" onChange={(e) => handleFileUpload(e,'current_yr_file')} />
			</div>
			
			<div className="prev-file-upload">
				<h2>Pevious Year</h2>
				<input type="file" onChange={(e) => handleFileUpload(e,'previous_yr_file')} />
			</div>
			<div className="file-submit">
				<input type="submit" />
			</div>
		</form>	
		
		
		<EmployeeList />
		
		
		
    </div>
  );
}

export default Home;
