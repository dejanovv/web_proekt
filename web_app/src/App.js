import React from 'react';
import './App.css';
import BarChart from '../src/charts/BubbleChart'

function App() {

  var data = [
    {
      NumberOfAppearances: 40,
      Category: 1,
      Name: "Disease 1",
      cluster: 1, 
      radius : 40

    },
    {
      NumberOfAppearances: 3,
      Category: 1,
      Name: "Disease 2",
      cluster: 1, 
      radius : 3
    },
    {
      NumberOfAppearances: 42,
      Category: 1,
      Name: "Disease 3",
      cluster: 1, 
      radius : 42
    },
    {
      NumberOfAppearances: 30,
      Category: 2,
      Name: "Disease 4",
      cluster: 2, 
      radius : 30

    },
    {
      NumberOfAppearances: 12,
      Category: 3,
      Name: "Disease 5",
      cluster: 3, 
      radius : 12
    },
    {
      NumberOfAppearances: 32,
      Category: 3,
      Name: "Disease 6",cluster: 3, 
      radius : 32
    },
        {
      NumberOfAppearances: 2,
      Category: 1,
      Name: "Disease 3",
      cluster: 1, 
      radius : 2
    },
    {
      NumberOfAppearances: 12,
      Category: 2,
      Name: "Disease 4",
      cluster: 2, 
      radius : 12

    },
    {
      NumberOfAppearances: 102,
      Category: 3,
      Name: "Disease 5",
      cluster: 3, 
      radius : 102
    },
    {
      NumberOfAppearances: 22,
      Category: 3,
      Name: "Disease 6",cluster: 3, 
      radius : 22
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
