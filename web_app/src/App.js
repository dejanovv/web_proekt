import React from 'react';
import './App.css';
import BarChart from '../src/charts/BubbleChart'

function App() {

  var data = [
    {
      circle: 40,

    },
    {
      circle: 3
    },
    {
      circle: 42
    },
    {
      circle: 30
    }
  ]
  var links = [
    {"source": 0, "target": 1, 'weight': 2},
    {"source": 0, "target": 2, 'weight': 20}
  ]

  return (
    
    <div id="App">
       <BarChart data={data} links={links} />
    </div>
  );
}

export default App;
