//import data from './data.json';

function getData(id = data[0][0]){
 return data.filter(x=>x[0] == id)
      .sort((a,b)=>a[2]-b[2])
      .slice(0,10);
}

