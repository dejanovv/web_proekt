import React from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'

function App() {

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
    <div id="App">
       <BubbleChart data={data} links={links} />
    </div>
  );
}

export default App;
