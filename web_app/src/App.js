import React from 'react';
import './App.css';
import BarChart from '../src/charts/BubbleChart'

function App() {

  var data = [
    {
      circle: 40,
      Category: 1,
      Name: "Disease 1"

    },
    {
      circle: 3,
      Category: 1,
      Name: "Disease 2"
    },
    {
      circle: 42,
      Category: 1,
      Name: "Disease 3"
    },
    {
      circle: 30,
      Category: 2,
      Name: "Disease 4"

    },
    {
      circle: 102,
      Category: 3,
      Name: "Disease 5"
    },
    {
      circle: 32,
      Category: 3,
      Name: "Disease 6"
    }

  ]
  var links = [
    {"source": 3, "target": 2, 'weight': 13}
  ]

  return (
    
    <div id="App">
       <BarChart data={data} links={links} />
    </div>
  );
}

export default App;
