import data from './data.json';
function getData(id = data[10][0],layer = 0){
      if(layer == 5){
            return []
         }
var result = data.filter(x=>x[0] == id)
            .sort((a,b)=>a[2]-b[2])
            .slice(0,10);
var array = [];
for(var item of result){
var resu = getData(item[1],layer + 1);
array = merge(array,resu)
}
return [...result,...array];
}
function merge(arrOne,arrTwo){
      arrTwo.forEach(element => {
          if(!arrOne.find(x=>x[0] == element[0]&& x[1] == element[1])){
              arrOne.push(element);
          }
      });
      return arrOne;
  }
export default getData;