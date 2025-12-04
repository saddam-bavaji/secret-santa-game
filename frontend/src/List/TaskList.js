import React, {useState,useEffect} from 'react';
import axios from "axios";

function TaskList() {
	
	const [showlist, setshowlist] = useState(true);
	const [myList, setmyList] = useState([]);
		
	////////////////////
	useEffect(()=>{
		const fetchTask = async () => {
		try {
		  const response = await axios.get(
			"http://localhost:5000/secret-santa-game/backend/assignTask/list"
		  );

		  setmyList(response.data.data); 
		  
		  if (showlist) {setshowlist(false)};
		  
		} catch (error) {
		  console.error("Error fetching tasks:", error);
		}
	  };
		
	  fetchTask();
	},[showlist]);
	
	
  return (
    <div className="App" >
				
		{myList && myList.length > 0 && <div className="preview-json-data">
			<h2>Assignments List</h2>
			<table border='1'>
			<thead><tr><th>S.no</th><th>Employee</th><th>Santa Child</th><th>Task assigned Code</th></tr></thead>
				<tbody>
				{myList.map((item,index)=>{
					return <tr key={index}>
						<td>{index + 1}</td>
						<td>{item.employee}</td>							
						<td>{item.child_email}</td>							
						<td>{item.assigned_tasks[0].code+', '+item.assigned_tasks[1].code+', '+item.assigned_tasks[2].code}</td>							
					</tr>
				})}
				</tbody>	
			</table>	
		</div>}
		
    </div>
  );
}

export default TaskList;
