import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Users from "./Users"
import Signup from './Signup';
import Tests from './Tests';
import { app } from './firebase.config'
import Tanue from './Tanue';
import Pablo from './Pablo';
import Chris from './Chris';


function App() {

  return (
    <Router>
       <div className="App">
        <>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/users" exact element={<Users />} />
          <Route path="/test" exact element={<Tests />} />
          <Route path="/tanue" exact element={<Tanue />} />
          <Route path="/pablo" exact element={<Pablo />} />
          <Route path="/chris" exact element={<Chris />} />
        </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
