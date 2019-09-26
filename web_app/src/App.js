import React, {Component} from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'
import SequencesSunburst from '../src/charts/SequencesSunburst'
import HomeScreen from './homescreen.js';
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from 'react-router-dom';
import "./style.css"
import getSequencesData  from "./services/sequencesData.js"
import getBubbleData from './services/bubbleService.js';

var seqData = getSequencesData();
console.log(seqData)
class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      sequencesData:seqData,
      diseaseIds : Array.from(new Set(seqData.map(x=>x[0]))),
      originalCenter: seqData[1][0]
    };
  }
  componentDidMount(){
console.log(this.props);
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
      }
      e.target.value = null;
      }
  }
render(){
  
  var bubbleData = getBubbleData();
  console.log(bubbleData.length);
  
  return (    
    
    <Router  history={this.props.history}>
    <div id="App">
      <nav >
        <ul>
          <li><Link to={'/'} className="nav-link"> Home </Link></li>
          <li><Link to={'/network'} className="nav-link">Disease Network</Link></li>
          <li><Link to={'/sunburst'} className="nav-link">Sequences Sunburst</Link></li>         
          
                 
        </ul> 
        
      </nav>
        <Switch>
          <Route exact path='/' render = {HomeScreen} />
          <Route path='/network' render = {() => <BubbleChart bubbleData={bubbleData} />} />
          <Route exact path='/sunburst' render =    
          {() => <SequencesSunburst 
                    data={this.state.sequencesData} 
                    originalCenter={this.state.originalCenter}
                    diseaseIds = {this.state.diseaseIds}/>
          }/>
        </Switch>              
    </div>
    </Router>
  );
}
}

export default withRouter(App);
