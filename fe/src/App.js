
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Pf from "./Pages/Pf"
import Dashboarch from './Pages/Dashboarch';
import Datasensor from './Pages/Datasensor';
import Actionhistory from './Pages/Actionhistory';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboarch />}></Route>
          <Route path='/datasensor' element={<Datasensor />}></Route>

          <Route path='/actionhistory' element={<Actionhistory />}></Route>
          <Route path='/profile' element={<Pf />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
