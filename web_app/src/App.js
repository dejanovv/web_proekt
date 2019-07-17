import React, {Component} from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'
import SequencesSunburst from '../src/charts/SequencesSunburst'
import HomeScreen from './homescreen.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./style.css"


class App extends Component { 
  
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }
render(){

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
  var data = [
    {
      "NumberOfAppearances": 104,
      "Category": 3,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 42,
      "Category": 8,
      "Name": "et"
    },
    {
      "NumberOfAppearances": 50,
      "Category": 2,
      "Name": "magna"
    },
    {
      "NumberOfAppearances": 58,
      "Category": 2,
      "Name": "consequat"
    },
    {
      "NumberOfAppearances": 82,
      "Category": 5,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 83,
      "Category": 10,
      "Name": "tempor"
    },
    {
      "NumberOfAppearances": 45,
      "Category": 6,
      "Name": "irure"
    },
    {
      "NumberOfAppearances": 100,
      "Category": 3,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 113,
      "Category": 8,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 46,
      "Category": 2,
      "Name": "qui"
    },
    {
      "NumberOfAppearances": 54,
      "Category": 3,
      "Name": "consequat"
    },
    {
      "NumberOfAppearances": 93,
      "Category": 7,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 49,
      "Category": 9,
      "Name": "deserunt"
    },
    {
      "NumberOfAppearances": 88,
      "Category": 7,
      "Name": "commodo"
    },
    {
      "NumberOfAppearances": 30,
      "Category": 9,
      "Name": "pariatur"
    },
    {
      "NumberOfAppearances": 65,
      "Category": 2,
      "Name": "officia"
    },
    {
      "NumberOfAppearances": 116,
      "Category": 3,
      "Name": "nostrud"
    },
    {
      "NumberOfAppearances": 87,
      "Category": 1,
      "Name": "labore"
    },
    {
      "NumberOfAppearances": 49,
      "Category": 5,
      "Name": "laborum"
    },
    {
      "NumberOfAppearances": 49,
      "Category": 8,
      "Name": "est"
    },
    {
      "NumberOfAppearances": 52,
      "Category": 3,
      "Name": "incididunt"
    },
    {
      "NumberOfAppearances": 54,
      "Category": 3,
      "Name": "laborum"
    },
    {
      "NumberOfAppearances": 92,
      "Category": 3,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 51,
      "Category": 10,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 58,
      "Category": 3,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 62,
      "Category": 6,
      "Name": "duis"
    },
    {
      "NumberOfAppearances": 106,
      "Category": 7,
      "Name": "sint"
    },
    {
      "NumberOfAppearances": 78,
      "Category": 2,
      "Name": "consectetur"
    },
    {
      "NumberOfAppearances": 66,
      "Category": 3,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 96,
      "Category": 1,
      "Name": "aliquip"
    },
    {
      "NumberOfAppearances": 106,
      "Category": 2,
      "Name": "sunt"
    },
    {
      "NumberOfAppearances": 105,
      "Category": 5,
      "Name": "et"
    },
    {
      "NumberOfAppearances": 94,
      "Category": 1,
      "Name": "velit"
    },
    {
      "NumberOfAppearances": 64,
      "Category": 10,
      "Name": "enim"
    },
    {
      "NumberOfAppearances": 93,
      "Category": 2,
      "Name": "Lorem"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 6,
      "Name": "sit"
    },
    {
      "NumberOfAppearances": 104,
      "Category": 1,
      "Name": "non"
    },
    {
      "NumberOfAppearances": 30,
      "Category": 9,
      "Name": "occaecat"
    },
    {
      "NumberOfAppearances": 120,
      "Category": 6,
      "Name": "magna"
    },
    {
      "NumberOfAppearances": 101,
      "Category": 8,
      "Name": "cupidatat"
    },
    {
      "NumberOfAppearances": 119,
      "Category": 8,
      "Name": "veniam"
    },
    {
      "NumberOfAppearances": 36,
      "Category": 8,
      "Name": "adipisicing"
    },
    {
      "NumberOfAppearances": 116,
      "Category": 6,
      "Name": "aute"
    },
    {
      "NumberOfAppearances": 31,
      "Category": 2,
      "Name": "et"
    },
    {
      "NumberOfAppearances": 81,
      "Category": 4,
      "Name": "qui"
    },
    {
      "NumberOfAppearances": 95,
      "Category": 6,
      "Name": "occaecat"
    },
    {
      "NumberOfAppearances": 104,
      "Category": 2,
      "Name": "sunt"
    },
    {
      "NumberOfAppearances": 110,
      "Category": 2,
      "Name": "Lorem"
    },
    {
      "NumberOfAppearances": 57,
      "Category": 5,
      "Name": "elit"
    },
    {
      "NumberOfAppearances": 91,
      "Category": 9,
      "Name": "elit"
    },
    {
      "NumberOfAppearances": 112,
      "Category": 2,
      "Name": "enim"
    },
    {
      "NumberOfAppearances": 48,
      "Category": 3,
      "Name": "officia"
    },
    {
      "NumberOfAppearances": 38,
      "Category": 3,
      "Name": "commodo"
    },
    {
      "NumberOfAppearances": 94,
      "Category": 9,
      "Name": "laboris"
    },
    {
      "NumberOfAppearances": 99,
      "Category": 5,
      "Name": "eu"
    },
    {
      "NumberOfAppearances": 83,
      "Category": 3,
      "Name": "consequat"
    },
    {
      "NumberOfAppearances": 64,
      "Category": 7,
      "Name": "deserunt"
    },
    {
      "NumberOfAppearances": 95,
      "Category": 8,
      "Name": "ad"
    },
    {
      "NumberOfAppearances": 102,
      "Category": 7,
      "Name": "consequat"
    },
    {
      "NumberOfAppearances": 72,
      "Category": 2,
      "Name": "consectetur"
    },
    {
      "NumberOfAppearances": 31,
      "Category": 7,
      "Name": "adipisicing"
    },
    {
      "NumberOfAppearances": 82,
      "Category": 1,
      "Name": "id"
    },
    {
      "NumberOfAppearances": 112,
      "Category": 1,
      "Name": "fugiat"
    },
    {
      "NumberOfAppearances": 81,
      "Category": 8,
      "Name": "quis"
    },
    {
      "NumberOfAppearances": 69,
      "Category": 3,
      "Name": "cillum"
    },
    {
      "NumberOfAppearances": 45,
      "Category": 9,
      "Name": "laborum"
    },
    {
      "NumberOfAppearances": 83,
      "Category": 7,
      "Name": "officia"
    },
    {
      "NumberOfAppearances": 50,
      "Category": 5,
      "Name": "commodo"
    },
    {
      "NumberOfAppearances": 118,
      "Category": 9,
      "Name": "cillum"
    },
    {
      "NumberOfAppearances": 98,
      "Category": 2,
      "Name": "sit"
    },
    {
      "NumberOfAppearances": 36,
      "Category": 10,
      "Name": "ullamco"
    },
    {
      "NumberOfAppearances": 114,
      "Category": 4,
      "Name": "ipsum"
    },
    {
      "NumberOfAppearances": 66,
      "Category": 1,
      "Name": "sunt"
    },
    {
      "NumberOfAppearances": 79,
      "Category": 9,
      "Name": "aute"
    },
    {
      "NumberOfAppearances": 55,
      "Category": 2,
      "Name": "sunt"
    },
    {
      "NumberOfAppearances": 75,
      "Category": 6,
      "Name": "non"
    },
    {
      "NumberOfAppearances": 40,
      "Category": 10,
      "Name": "aliquip"
    },
    {
      "NumberOfAppearances": 117,
      "Category": 2,
      "Name": "nostrud"
    },
    {
      "NumberOfAppearances": 61,
      "Category": 10,
      "Name": "duis"
    },
    {
      "NumberOfAppearances": 40,
      "Category": 7,
      "Name": "laboris"
    },
    {
      "NumberOfAppearances": 103,
      "Category": 3,
      "Name": "qui"
    },
    {
      "NumberOfAppearances": 100,
      "Category": 5,
      "Name": "magna"
    },
    {
      "NumberOfAppearances": 80,
      "Category": 7,
      "Name": "veniam"
    },
    {
      "NumberOfAppearances": 78,
      "Category": 5,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 106,
      "Category": 1,
      "Name": "cillum"
    },
    {
      "NumberOfAppearances": 103,
      "Category": 10,
      "Name": "aute"
    },
    {
      "NumberOfAppearances": 37,
      "Category": 7,
      "Name": "ut"
    },
    {
      "NumberOfAppearances": 33,
      "Category": 3,
      "Name": "labore"
    },
    {
      "NumberOfAppearances": 78,
      "Category": 2,
      "Name": "incididunt"
    },
    {
      "NumberOfAppearances": 94,
      "Category": 5,
      "Name": "occaecat"
    },
    {
      "NumberOfAppearances": 78,
      "Category": 3,
      "Name": "nostrud"
    },
    {
      "NumberOfAppearances": 120,
      "Category": 6,
      "Name": "est"
    },
    {
      "NumberOfAppearances": 72,
      "Category": 7,
      "Name": "elit"
    },
    {
      "NumberOfAppearances": 55,
      "Category": 3,
      "Name": "aliquip"
    },
    {
      "NumberOfAppearances": 90,
      "Category": 5,
      "Name": "incididunt"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 10,
      "Name": "exercitation"
    },
    {
      "NumberOfAppearances": 44,
      "Category": 1,
      "Name": "laborum"
    },
    {
      "NumberOfAppearances": 63,
      "Category": 10,
      "Name": "do"
    },
    {
      "NumberOfAppearances": 100,
      "Category": 2,
      "Name": "nostrud"
    },
    {
      "NumberOfAppearances": 45,
      "Category": 5,
      "Name": "amet"
    }
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
