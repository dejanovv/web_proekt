import React, {Component} from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'
import SequencesSunburst from '../src/charts/SequencesSunburst'
import HomeScreen from './homescreen.js';
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from 'react-router-dom';
import "./style.css"
import sequencesDataService  from "./services/sequencesData.json"
import getBubbleData from './charts/data.js';


class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      sequencesData: sequencesDataService.sequencesData,
      diseaseIds : sequencesDataService.sequencesData.map(x=>x[0]),
      originalCenter:sequencesDataService.sequencesData[0][0]
    };
  }
  componentDidMount(){

  }
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
    var result = e.target.value;
    if(this.state.diseaseIds.some(x => x == result)){
      this.setState((prevState) => {
        return {
          sequencesData:prevState.sequencesData,
          originalCenter:result
          }
        })
        this.props.history.push('sunburst');
        this.props.history.go()
      }
      e.target.value = null;
      }
  }
render(){
  var bubbleData = getBubbleData();
  var links = [
    {"source": 5, "target": 2, 'weight': 13},
    {"source": 36, "target": 53, 'weight': 4},
    {"source": 32, "target": 94, 'weight': 7},
    {"source": 82, "target": 63, 'weight': 3}
  ]
  return (    
    <Router  history={this.props.history}>
    <div id="App">
      <nav >
        <ul>
          <li><Link to={'/'} className="nav-link"> Home </Link></li>
          <li><Link to={'/network'} className="nav-link">Disease Network</Link></li>
          <li><Link to={'/sunburst'} className="nav-link">Sequences Sunburst</Link></li>
          <li style={{float:"right"}}> 
            <input 
              className="search" 
              list="search" 
              type="search" 
              onKeyDown={this._handleKeyDown} 
              placeholder="Search a disease..."/>
          </li>
        </ul> 
        <datalist id="search">
          {
            this.state.diseaseIds.map( x => (<option value={x}>{x}</option>))
          }
        </datalist>
      </nav>
        <Switch>
          <Route exact path='/' render = {HomeScreen} />
          <Route path='/network' render = {() => <BubbleChart data={bubbleData} links={links}/>} />
          <Route exact path='/sunburst' render = 
          {() => <SequencesSunburst 
                    data={this.state.sequencesData} 
                    originalCenter={this.state.originalCenter}/>
          }/>
        </Switch>              
    </div>
    </Router>
  );
}
}

export default withRouter(App);
