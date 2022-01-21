import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from  './components/Detail';
import ActivityCreate from  './components/ActivityCreate';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path ="/" element = {<LandingPage />}></Route>
        <Route path ="/home" element = {<Home/>}></Route>
        <Route path ="/activity" element = {<ActivityCreate/>}></Route>
        <Route path ="/home/:id" element = {<Detail/>}></Route>
      </Routes>
    </div>
  );
}



      
