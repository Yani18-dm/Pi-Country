/*import './App.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    render(
      <BrowserRouter>
        <Routes>
          <div className="App">
          <Route path ="/" element = {<Landing />}></Route>
              <Route path='/home' component={Home}/>
          </div>
      </Routes>
    </BrowserRouter>,
  ))
}

export default App;*/

import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from  './components/Detail';
import ActivityCreate from  './components/ActivityCreate';

import './App.css';

function App() {
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

export default App;

      
