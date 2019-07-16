import React, {Component} from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'
import HomeScreen from './homescreen.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



class App extends Component { 
  
render(){
  var data = [
    {
      NumberOfAppearances: 40,
      Category: 1,
      Name: "Disease 1"
    },
    {
      NumberOfAppearances: 3,
      Category: 1,
      Name: "Disease 2"
    },
    {
      NumberOfAppearances: 42,
      Category: 1,
      Name: "Disease 3"
    },
    {
      NumberOfAppearances: 30,
      Category: 2,
      Name: "Disease 4"
  
    },
    {
      NumberOfAppearances: 102,
      Category: 3,
      Name: "Disease 5"
    },
    {
      NumberOfAppearances: 32,
      Category: 3,
      Name: "Disease 6"
    }
  
  ]
  var links = [
    {"source": 3, "target": 2, 'weight': 13},
    {"source": 1, "target": 2, 'weight': 23}
  ]
  return (    
    
    <Router>
    <div id="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/network'} className="nav-link">Disease Network</Link></li>
          </ul>
          </nav>
          <hr />
        <Switch>
          <Route exact path='/' render = {HomeScreen} />
          <Route path='/network' render = {() => <BubbleChart data={[
    {
      NumberOfAppearances: 40,
      Category: 1,
      Name: "Disease 1"
    },
    {
      NumberOfAppearances: 3,
      Category: 1,
      Name: "Disease 2"
    },
    {
      NumberOfAppearances: 42,
      Category: 1,
      Name: "Disease 3"
    },
    {
      NumberOfAppearances: 30,
      Category: 2,
      Name: "Disease 4"
  
    },
    {
      NumberOfAppearances: 102,
      Category: 3,
      Name: "Disease 5"
    },
    {
      NumberOfAppearances: 32,
      Category: 3,
      Name: "Disease 6"
    }
  
  ]} links={[
    {"source": 3, "target": 2, 'weight': 13},
    {"source": 1, "target": 2, 'weight': 23}
  ]}/>} />
        </Switch>              
    </div>
    </Router>
  );
}
}

export default App;
