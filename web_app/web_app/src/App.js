import React, {Component} from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'
import SequencesSunburst from '../src/charts/SequencesSunburst'
import HomeScreen from './homescreen.js';
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from 'react-router-dom';
import "./style.css"
import sequencesDataService  from "./services/sequencesData.js"
import getBubbleData from './services/bubbleService.js';


class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      sequencesData: sequencesDataService.getData(),
      diseaseIds : Array.from(new Set(sequencesDataService.sequencesData.map(x=>x[0]))),
      originalCenter:sequencesDataService.sequencesData[0][0]
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
  var bubles = bubbleData[0].bubbles;
  var links = bubbleData[0].links;
  console.log(this.props.history);
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
          <Route path='/network' render = {() => <BubbleChart data={bubles} links={links}/>} />
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
