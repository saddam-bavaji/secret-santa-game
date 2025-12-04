import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Assignment from './Assignment';
import AssignmentMatchup from './AssignmentMatchup';

function App() {
		
  return (
    <div className="App">
		<h2 style={{color: "red",textAlign:'center'}}>Secret Santa Game</h2>
		<BrowserRouter>
		  {/* Navigation */}
		  <nav style={{padding: '5px',textAlign:'center'}}>
			<Link to="/" style={{padding: '5px'}}>Home</Link> |{" "}
			<Link to="/assignment" style={{padding: '5px'}}>Assignment</Link> |{" "}
			<Link to="/assignmentMatchup" style={{padding: '5px'}}>Assignment Matchup</Link>
		  </nav>

		  {/* Routes */}
		  <Routes>
			<Route path="/" element={<Home />} />
			<Route path="/assignment" element={<Assignment />} />
			<Route path="/assignmentMatchup" element={<AssignmentMatchup />} />
			
		  </Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
