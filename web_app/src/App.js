import React from 'react';
import './App.css';
import BubbleChart from '../src/charts/BubbleChart'

function App() {

  var data = [
    {
      "NumberOfAppearances": 61,
      "Category": 10,
      "Name": "qui"
    },
    {
      "NumberOfAppearances": 91,
      "Category": 7,
      "Name": "nisi"
    },
    {
      "NumberOfAppearances": 51,
      "Category": 2,
      "Name": "sunt"
    },
    {
      "NumberOfAppearances": 44,
      "Category": 6,
      "Name": "mollit"
    },
    {
      "NumberOfAppearances": 88,
      "Category": 3,
      "Name": "magna"
    },
    {
      "NumberOfAppearances": 92,
      "Category": 1,
      "Name": "duis"
    },
    {
      "NumberOfAppearances": 40,
      "Category": 9,
      "Name": "deserunt"
    },
    {
      "NumberOfAppearances": 33,
      "Category": 5,
      "Name": "est"
    },
    {
      "NumberOfAppearances": 52,
      "Category": 5,
      "Name": "laboris"
    },
    {
      "NumberOfAppearances": 52,
      "Category": 5,
      "Name": "consectetur"
    },
    {
      "NumberOfAppearances": 98,
      "Category": 3,
      "Name": "amet"
    },
    {
      "NumberOfAppearances": 54,
      "Category": 2,
      "Name": "ex"
    },
    {
      "NumberOfAppearances": 98,
      "Category": 8,
      "Name": "exercitation"
    },
    {
      "NumberOfAppearances": 33,
      "Category": 4,
      "Name": "voluptate"
    },
    {
      "NumberOfAppearances": 70,
      "Category": 9,
      "Name": "et"
    },
    {
      "NumberOfAppearances": 98,
      "Category": 7,
      "Name": "quis"
    },
    {
      "NumberOfAppearances": 108,
      "Category": 4,
      "Name": "ipsum"
    },
    {
      "NumberOfAppearances": 92,
      "Category": 3,
      "Name": "labore"
    },
    {
      "NumberOfAppearances": 50,
      "Category": 6,
      "Name": "laboris"
    },
    {
      "NumberOfAppearances": 38,
      "Category": 8,
      "Name": "laborum"
    },
    {
      "NumberOfAppearances": 99,
      "Category": 3,
      "Name": "laboris"
    },
    {
      "NumberOfAppearances": 107,
      "Category": 9,
      "Name": "ea"
    },
    {
      "NumberOfAppearances": 96,
      "Category": 7,
      "Name": "quis"
    },
    {
      "NumberOfAppearances": 83,
      "Category": 6,
      "Name": "officia"
    },
    {
      "NumberOfAppearances": 67,
      "Category": 6,
      "Name": "sint"
    },
    {
      "NumberOfAppearances": 50,
      "Category": 4,
      "Name": "amet"
    },
    {
      "NumberOfAppearances": 111,
      "Category": 6,
      "Name": "duis"
    },
    {
      "NumberOfAppearances": 58,
      "Category": 1,
      "Name": "non"
    },
    {
      "NumberOfAppearances": 116,
      "Category": 3,
      "Name": "culpa"
    },
    {
      "NumberOfAppearances": 42,
      "Category": 9,
      "Name": "enim"
    },
    {
      "NumberOfAppearances": 90,
      "Category": 9,
      "Name": "culpa"
    },
    {
      "NumberOfAppearances": 36,
      "Category": 6,
      "Name": "pariatur"
    },
    {
      "NumberOfAppearances": 97,
      "Category": 4,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 119,
      "Category": 4,
      "Name": "veniam"
    },
    {
      "NumberOfAppearances": 120,
      "Category": 9,
      "Name": "commodo"
    },
    {
      "NumberOfAppearances": 113,
      "Category": 10,
      "Name": "aliqua"
    },
    {
      "NumberOfAppearances": 86,
      "Category": 2,
      "Name": "ea"
    },
    {
      "NumberOfAppearances": 32,
      "Category": 4,
      "Name": "enim"
    },
    {
      "NumberOfAppearances": 43,
      "Category": 2,
      "Name": "Lorem"
    },
    {
      "NumberOfAppearances": 118,
      "Category": 5,
      "Name": "aliquip"
    },
    {
      "NumberOfAppearances": 104,
      "Category": 10,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 75,
      "Category": 5,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 30,
      "Category": 3,
      "Name": "aliquip"
    },
    {
      "NumberOfAppearances": 108,
      "Category": 6,
      "Name": "laboris"
    },
    {
      "NumberOfAppearances": 53,
      "Category": 8,
      "Name": "aliqua"
    },
    {
      "NumberOfAppearances": 119,
      "Category": 1,
      "Name": "consequat"
    },
    {
      "NumberOfAppearances": 53,
      "Category": 9,
      "Name": "do"
    },
    {
      "NumberOfAppearances": 94,
      "Category": 5,
      "Name": "velit"
    },
    {
      "NumberOfAppearances": 31,
      "Category": 10,
      "Name": "sint"
    },
    {
      "NumberOfAppearances": 42,
      "Category": 4,
      "Name": "occaecat"
    },
    {
      "NumberOfAppearances": 36,
      "Category": 1,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 65,
      "Category": 10,
      "Name": "sint"
    },
    {
      "NumberOfAppearances": 71,
      "Category": 6,
      "Name": "Lorem"
    },
    {
      "NumberOfAppearances": 106,
      "Category": 7,
      "Name": "amet"
    },
    {
      "NumberOfAppearances": 32,
      "Category": 3,
      "Name": "sit"
    },
    {
      "NumberOfAppearances": 117,
      "Category": 5,
      "Name": "ipsum"
    },
    {
      "NumberOfAppearances": 74,
      "Category": 5,
      "Name": "irure"
    },
    {
      "NumberOfAppearances": 107,
      "Category": 2,
      "Name": "ea"
    },
    {
      "NumberOfAppearances": 98,
      "Category": 9,
      "Name": "sint"
    },
    {
      "NumberOfAppearances": 90,
      "Category": 2,
      "Name": "nulla"
    },
    {
      "NumberOfAppearances": 31,
      "Category": 10,
      "Name": "pariatur"
    },
    {
      "NumberOfAppearances": 60,
      "Category": 7,
      "Name": "ex"
    },
    {
      "NumberOfAppearances": 73,
      "Category": 8,
      "Name": "ad"
    },
    {
      "NumberOfAppearances": 71,
      "Category": 9,
      "Name": "adipisicing"
    },
    {
      "NumberOfAppearances": 118,
      "Category": 10,
      "Name": "officia"
    },
    {
      "NumberOfAppearances": 92,
      "Category": 6,
      "Name": "in"
    },
    {
      "NumberOfAppearances": 119,
      "Category": 1,
      "Name": "consequat"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 10,
      "Name": "veniam"
    },
    {
      "NumberOfAppearances": 108,
      "Category": 2,
      "Name": "duis"
    },
    {
      "NumberOfAppearances": 71,
      "Category": 8,
      "Name": "tempor"
    },
    {
      "NumberOfAppearances": 116,
      "Category": 8,
      "Name": "nostrud"
    },
    {
      "NumberOfAppearances": 77,
      "Category": 4,
      "Name": "nulla"
    },
    {
      "NumberOfAppearances": 46,
      "Category": 10,
      "Name": "irure"
    },
    {
      "NumberOfAppearances": 53,
      "Category": 7,
      "Name": "Lorem"
    },
    {
      "NumberOfAppearances": 96,
      "Category": 7,
      "Name": "elit"
    },
    {
      "NumberOfAppearances": 119,
      "Category": 4,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 36,
      "Category": 2,
      "Name": "culpa"
    },
    {
      "NumberOfAppearances": 75,
      "Category": 1,
      "Name": "incididunt"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 2,
      "Name": "ipsum"
    },
    {
      "NumberOfAppearances": 119,
      "Category": 10,
      "Name": "id"
    },
    {
      "NumberOfAppearances": 65,
      "Category": 5,
      "Name": "ut"
    },
    {
      "NumberOfAppearances": 48,
      "Category": 5,
      "Name": "id"
    },
    {
      "NumberOfAppearances": 87,
      "Category": 3,
      "Name": "nisi"
    },
    {
      "NumberOfAppearances": 100,
      "Category": 6,
      "Name": "tempor"
    },
    {
      "NumberOfAppearances": 67,
      "Category": 9,
      "Name": "fugiat"
    },
    {
      "NumberOfAppearances": 55,
      "Category": 8,
      "Name": "dolore"
    },
    {
      "NumberOfAppearances": 57,
      "Category": 4,
      "Name": "dolore"
    },
    {
      "NumberOfAppearances": 86,
      "Category": 9,
      "Name": "veniam"
    },
    {
      "NumberOfAppearances": 70,
      "Category": 5,
      "Name": "do"
    },
    {
      "NumberOfAppearances": 79,
      "Category": 2,
      "Name": "magna"
    },
    {
      "NumberOfAppearances": 69,
      "Category": 10,
      "Name": "ad"
    },
    {
      "NumberOfAppearances": 88,
      "Category": 5,
      "Name": "ex"
    },
    {
      "NumberOfAppearances": 35,
      "Category": 2,
      "Name": "eu"
    },
    {
      "NumberOfAppearances": 54,
      "Category": 9,
      "Name": "sunt"
    },
    {
      "NumberOfAppearances": 120,
      "Category": 9,
      "Name": "reprehenderit"
    },
    {
      "NumberOfAppearances": 120,
      "Category": 1,
      "Name": "mollit"
    },
    {
      "NumberOfAppearances": 45,
      "Category": 6,
      "Name": "aute"
    },
    {
      "NumberOfAppearances": 88,
      "Category": 6,
      "Name": "nisi"
    },
    {
      "NumberOfAppearances": 56,
      "Category": 1,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 114,
      "Category": 6,
      "Name": "nulla"
    },
    {
      "NumberOfAppearances": 75,
      "Category": 8,
      "Name": "est"
    },
    {
      "NumberOfAppearances": 59,
      "Category": 5,
      "Name": "ullamco"
    },
    {
      "NumberOfAppearances": 59,
      "Category": 6,
      "Name": "irure"
    },
    {
      "NumberOfAppearances": 63,
      "Category": 5,
      "Name": "nisi"
    },
    {
      "NumberOfAppearances": 63,
      "Category": 6,
      "Name": "proident"
    },
    {
      "NumberOfAppearances": 66,
      "Category": 8,
      "Name": "ex"
    },
    {
      "NumberOfAppearances": 74,
      "Category": 2,
      "Name": "cillum"
    },
    {
      "NumberOfAppearances": 97,
      "Category": 10,
      "Name": "deserunt"
    },
    {
      "NumberOfAppearances": 52,
      "Category": 7,
      "Name": "nostrud"
    },
    {
      "NumberOfAppearances": 103,
      "Category": 4,
      "Name": "dolore"
    },
    {
      "NumberOfAppearances": 118,
      "Category": 3,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 111,
      "Category": 1,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 78,
      "Category": 7,
      "Name": "aliquip"
    },
    {
      "NumberOfAppearances": 44,
      "Category": 9,
      "Name": "commodo"
    },
    {
      "NumberOfAppearances": 80,
      "Category": 8,
      "Name": "commodo"
    },
    {
      "NumberOfAppearances": 51,
      "Category": 7,
      "Name": "voluptate"
    },
    {
      "NumberOfAppearances": 88,
      "Category": 2,
      "Name": "dolor"
    },
    {
      "NumberOfAppearances": 41,
      "Category": 4,
      "Name": "minim"
    },
    {
      "NumberOfAppearances": 119,
      "Category": 1,
      "Name": "irure"
    },
    {
      "NumberOfAppearances": 100,
      "Category": 8,
      "Name": "veniam"
    },
    {
      "NumberOfAppearances": 67,
      "Category": 1,
      "Name": "exercitation"
    },
    {
      "NumberOfAppearances": 74,
      "Category": 6,
      "Name": "cillum"
    },
    {
      "NumberOfAppearances": 94,
      "Category": 4,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 85,
      "Category": 8,
      "Name": "ut"
    },
    {
      "NumberOfAppearances": 52,
      "Category": 1,
      "Name": "nisi"
    },
    {
      "NumberOfAppearances": 48,
      "Category": 1,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 51,
      "Category": 8,
      "Name": "sit"
    },
    {
      "NumberOfAppearances": 97,
      "Category": 5,
      "Name": "aliquip"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 7,
      "Name": "dolor"
    },
    {
      "NumberOfAppearances": 103,
      "Category": 10,
      "Name": "irure"
    },
    {
      "NumberOfAppearances": 39,
      "Category": 1,
      "Name": "id"
    },
    {
      "NumberOfAppearances": 46,
      "Category": 5,
      "Name": "exercitation"
    },
    {
      "NumberOfAppearances": 116,
      "Category": 7,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 61,
      "Category": 7,
      "Name": "reprehenderit"
    },
    {
      "NumberOfAppearances": 35,
      "Category": 2,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 100,
      "Category": 5,
      "Name": "elit"
    },
    {
      "NumberOfAppearances": 54,
      "Category": 7,
      "Name": "voluptate"
    },
    {
      "NumberOfAppearances": 114,
      "Category": 8,
      "Name": "sunt"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 5,
      "Name": "ad"
    },
    {
      "NumberOfAppearances": 88,
      "Category": 4,
      "Name": "labore"
    },
    {
      "NumberOfAppearances": 32,
      "Category": 2,
      "Name": "in"
    },
    {
      "NumberOfAppearances": 104,
      "Category": 6,
      "Name": "aliqua"
    },
    {
      "NumberOfAppearances": 30,
      "Category": 4,
      "Name": "eu"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 1,
      "Name": "enim"
    },
    {
      "NumberOfAppearances": 38,
      "Category": 9,
      "Name": "do"
    },
    {
      "NumberOfAppearances": 83,
      "Category": 9,
      "Name": "esse"
    },
    {
      "NumberOfAppearances": 47,
      "Category": 4,
      "Name": "eiusmod"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 3,
      "Name": "ullamco"
    },
    {
      "NumberOfAppearances": 106,
      "Category": 6,
      "Name": "et"
    },
    {
      "NumberOfAppearances": 65,
      "Category": 2,
      "Name": "reprehenderit"
    },
    {
      "NumberOfAppearances": 60,
      "Category": 6,
      "Name": "magna"
    },
    {
      "NumberOfAppearances": 58,
      "Category": 7,
      "Name": "ad"
    },
    {
      "NumberOfAppearances": 115,
      "Category": 10,
      "Name": "non"
    },
    {
      "NumberOfAppearances": 99,
      "Category": 3,
      "Name": "nisi"
    },
    {
      "NumberOfAppearances": 78,
      "Category": 1,
      "Name": "ullamco"
    },
    {
      "NumberOfAppearances": 81,
      "Category": 2,
      "Name": "Lorem"
    },
    {
      "NumberOfAppearances": 101,
      "Category": 4,
      "Name": "cillum"
    },
    {
      "NumberOfAppearances": 51,
      "Category": 5,
      "Name": "velit"
    },
    {
      "NumberOfAppearances": 47,
      "Category": 5,
      "Name": "cillum"
    },
    {
      "NumberOfAppearances": 117,
      "Category": 9,
      "Name": "deserunt"
    },
    {
      "NumberOfAppearances": 52,
      "Category": 7,
      "Name": "ea"
    },
    {
      "NumberOfAppearances": 32,
      "Category": 6,
      "Name": "culpa"
    },
    {
      "NumberOfAppearances": 56,
      "Category": 6,
      "Name": "reprehenderit"
    },
    {
      "NumberOfAppearances": 116,
      "Category": 6,
      "Name": "voluptate"
    },
    {
      "NumberOfAppearances": 83,
      "Category": 2,
      "Name": "proident"
    },
    {
      "NumberOfAppearances": 74,
      "Category": 1,
      "Name": "amet"
    },
    {
      "NumberOfAppearances": 67,
      "Category": 6,
      "Name": "exercitation"
    },
    {
      "NumberOfAppearances": 103,
      "Category": 8,
      "Name": "duis"
    },
    {
      "NumberOfAppearances": 79,
      "Category": 7,
      "Name": "Lorem"
    },
    {
      "NumberOfAppearances": 38,
      "Category": 9,
      "Name": "irure"
    },
    {
      "NumberOfAppearances": 81,
      "Category": 3,
      "Name": "elit"
    },
    {
      "NumberOfAppearances": 70,
      "Category": 10,
      "Name": "aliqua"
    },
    {
      "NumberOfAppearances": 47,
      "Category": 1,
      "Name": "elit"
    },
    {
      "NumberOfAppearances": 76,
      "Category": 7,
      "Name": "enim"
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
