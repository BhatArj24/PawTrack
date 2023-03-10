
import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

const NavBar = () => {
    return(
        <header>
            <nav className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3">
                <h1 className="h3 my-0 me-md-auto fw-bold text-white">PawTrack</h1>
                <nav className="my-2 my-md-0 me-md-3">
                    <Link className="mx-2 btn btn-sm p-2 text-light" style={{backgroundColor:"#355cdc",border:"none"}} to="/home">Home</Link>                  
                    <Link className="mx-2 btn btn-sm p-2 text-light btn-dark" style={{backgroundColor:"#355cdc",border:"none"}} to="/dashboard">Dashboard</Link>
                    <Link className="mx-2 btn btn-sm p-2 text-light btn-dark" style={{backgroundColor:"#355cdc",border:"none"}} to="/login">Log In</Link>
   
                </nav>
            </nav>
      </header>
    );
};

export default NavBar;