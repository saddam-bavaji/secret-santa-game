import React, {useState,useEffect,useCallback} from 'react';
import axios from "axios";

function AssignmentList() {
	
	const [showlist, setshowlist] = useState(true);
	const [myList, setmyList] = useState([]);
		
	////////////////////
	useEffect(()=>{
		const fetchAssignments = async () => {
		try {
		  const response = await axios.get(
			"http://localhost:5000/secret-santa-game/backend/assignment/list"
		  );

		  setmyList(response.data.data); 
		  
		  if (showlist) {setshowlist(false)};
		  
		} catch (error) {
		  console.error("Error fetching assignments:", error);
		}
	  };
		
	  fetchAssignments();
	},[showlist]);
	
	
	const downloadCSV = useCallback(() => {
  if (!myList || myList.length === 0) {
    alert("No data available to download");
    return;
  }

  // Convert JSON to CSV
  const csvRows = [];

  // Extract headers (keys)
  const headers = Object.keys(myList[0]);
  csvRows.push(headers.join(","));

  // Push values
  myList.forEach((row) => {
    const values = headers.map((h) => {
      const val = row[h];
      return typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val;
    });
    csvRows.push(values.join(","));
  });

  const csvContent = csvRows.join("\n");

  // Create a downloadable file
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Employee_list.csv";
  link.click();

  window.URL.revokeObjectURL(url);
},[myList]);
	
  return (
    <div className="App" >
				
		{myList && myList.length > 0 && <div className="preview-json-data">
			<h2>Assignments List</h2>
			<div><button onClick={downloadCSV}>
  Download CSV
</button></div>
			<table border='1'>
			<thead><tr><th>S.no</th><th>Code</th><th>Task</th></tr></thead>
				<tbody>
				{myList.map((item,index)=>{
					return <tr key={index}>
						<td>{index + 1}</td>
						<td>{item.assignment_code}</td>							
						<td>{item.assignment}</td>							
					</tr>
				})}
				</tbody>	
			</table>	
		</div>}
		
    </div>
  );
}

export default AssignmentList;
