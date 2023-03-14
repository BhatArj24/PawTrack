import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import {Helmet} from 'react-helmet';

function App() {
  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>PawTrack</title>
        <meta name='description' content='PawTrack, the Ultimate Dog Tracker' />
      </Helmet>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>


        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
