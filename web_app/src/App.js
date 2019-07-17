import React, {Component} from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'
import SequencesSunburst from '../src/charts/SequencesSunburst'
import HomeScreen from './homescreen.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./style.css"
import getBubbleData from './charts/data.js';


class App extends Component { 
  
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }
render(){
  var bubbleData = getBubbleData();
  var sequencesData = [
    [11,12,11],
    [11,13,1],
    [13,14,7],
    [11,16,3],
    [16,19,1],
    [19,1122,3],
    [1122,112,8],
  ]
  var route = [
    {c:SequencesSunburst,data:sequencesData,originalCenter:sequencesData[0][0]}
  ]
  
  var links = [
    {"source": 5, "target": 2, 'weight': 13},
    {"source": 36, "target": 53, 'weight': 4},
    {"source": 32, "target": 94, 'weight': 7},
    {"source": 82, "target": 63, 'weight': 3}
  ]
  return (    
    
    <Router>
    <div id="App">
      <nav >
        <ul>
          <li><Link to={'/'} className="nav-link"> Home </Link></li>
          <li><Link to={'/network'} className="nav-link">Disease Network</Link></li>
          <li><Link to={'/sunburst'} className="nav-link">Sequences Sunburst</Link></li>
          <li style={{float:"right"}}> <input className="search" onsearch type="search" onKeyDown={this._handleKeyDown} placeholder="Search a disease..."/></li>
        </ul> 
      </nav>
          <hr />
        <Switch>
          <Route exact path='/' render = {HomeScreen} />
          <Route path='/network' render = {() => <BubbleChart data={bubbleData} links={links}/>} />
  {route.map(x=>(
   <Route exact path='/sunburst' render = {()=><SequencesSunburst data={x.data} originalCenter={x.originalCenter}></SequencesSunburst>} />
  ))}
        </Switch>              
    </div>
    </Router>
  );
}
}

export default App;
