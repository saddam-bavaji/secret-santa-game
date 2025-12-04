import React, {useState,useEffect} from 'react';
import Papa from "papaparse";
import axios from "axios";
import AssignmentList from "./List/AssignmentList";

function Assignment() {
	
	const [jsonData, setJsonData] = useState(null);
	const [assignmentFile, setassignmentFile] = useState(null);
	const [showlist, setshowlist] = useState(true);
	const [myList, setmyList] = useState([]);
	
		
	const handleFileUpload = (e,r) =>{
		 const file = e.target.files[0];		
		 setassignmentFile(file);
		 
		 Papa.parse(file, {
		  header: true,
		  skipEmptyLines: true,
		  complete: function (results) {
			setJsonData(results.data);
			//console.log("Converted:", results.data);
		  },
		});
		
	 }
	 
	 const handleSubmit = async (e) => {
		  e.preventDefault();
	  const formData = new FormData();
	  formData.append("assignmentFile", assignmentFile);

	  try {
		const response = await axios.post(
		  "http://localhost:5000/secret-santa-game/backend/assignment",
		  formData,
		  { headers: { "Content-Type": "multipart/form-data" } }
		);
		setshowlist(true);
		 alert(response.data.message);
		console.log("Server Response:", response.data);

	  } catch (error) {
		console.error("Upload error:", error);
	  }
	};
	
	
	
  return (
    <div className="App" style={{marginLeft: '25px'}}>
		<div>
			<h2>Upload Assignment File</h2>
			<form onSubmit={handleSubmit}>
				<div className="curr-file-upload">
					<input type="file" onChange={(e) => handleFileUpload(e)} />
				</div>
				
				<div className="file-submit">
					<input type="submit" />
				</div>
			</form>		
		</div>
		
		
		
		
		<AssignmentList />
		
    </div>
  );
}

export default Assignment;
