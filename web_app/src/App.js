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
  var links = [
    {"source": "7ebc2a18-4b45-4f86-bc0d-27e8e6e3dd27", "target": "d1876b40-9c99-4162-b7d5-666b111fd1b7", 'weight': 13},
    {"source": "d1876b40-9c99-4162-b7d5-666b111fd1b7", "target": "2b358c96-6647-4017-bb25-92986d2a6505", "weight": 345 },
    {"source": "d1306e9b-ccc2-4db5-b2e3-9f642a4b9acb", "target": "e23929ec-1960-460d-b27a-53b88c5a95a2", "weight": 32333},
    {"source": "35f28d3f-a1e7-4a5c-aca5-44f7eec24259", "target": "c45cac11-dc6c-49fc-a8c1-d8e39df5e94e", "weight": 4332},
    {"source": "3b207b17-a5f1-4f24-8980-94bbcb91160c", "target": "e41de5e6-dd65-47e2-a15f-10c4f4b0c34c", "weight": 454554},
    {"source": "b558d920-4fa7-462c-b452-4532fc977355", "target": "32399343-241d-4294-8070-01602f9ee331", "weight": 344}
  ]
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
          <Route path='/network' render = {() => <BubbleChart data={bubbleData} links={links}/>} />
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
