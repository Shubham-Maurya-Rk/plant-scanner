import './App.css';
import AddPlants from './components/AddPlants';
import Navbar from './components/Navbar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PlantsList from './components/PlantsList';
import QR from './components/QR';
import PlantInfo from './components/PlantInfo';
import Admin from './components/Admin';
import { useState } from 'react';

function App() {
  const [loggedin, setloggedin] = useState(false);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar loggedin={loggedin} setloggedin={setloggedin} />
      <Routes>
        <Route exact path='/' index element={<Admin loggedin={loggedin} setloggedin={setloggedin} />}>
          <Route exact path='/add' element={<AddPlants />} />
          <Route exact index path='' element={<PlantsList />} />
          <Route exact path="qr/:title/:id" element={<QR />} />
        </Route>
        <Route exact path="/:id" element={<PlantInfo />} />
      </Routes>
    </Router> 
  );
}

export default App;
