import data from './data.json';
import react from "react";

var maxDisease = 20;
function normalizeData(){
  var bubbleArray = [];
  for(currentRow of data){
    var targetDiseaseId = currentRow[1];
    var currentRowId = currentRow[0];
    var reverseRow = data.find(x=>x[0] == targetDiseaseId && x[1] == currentRowId);
    //  Number Of Appearances Update
    var NOAUpdate = 1;
    if(reverseRow){
      currentRow[2] += reverseRow[2];
      removeRow(targetDiseaseId,currentRowId);
      NOAUpdate = 2;
    }
    var currentBubbleData = bubbleArray.find(x=>x.Id == currentRowId);
    var targetBubbleData = bubbleArray.find(x=>x.Id == targetDiseaseId);
    if(currentBubbleData){
      currentBubbleData.NumberOfAppearances+=NOAUpdate;
    }
    else{
      bubbleArray.push({
        Id:currentRowId,
        NumberOfAppearances:NOAUpdate,
        Name:currentRowId,
        Category:currentRowId[0]
      });
    }
    if(targetBubbleData){
      targetBubbleData.NumberOfAppearances+=NOAUpdate
    }else{
      bubbleArray.push({
        Id:targetDiseaseId,
        NumberOfAppearances:NOAUpdate,
        Name:targetDiseaseId,
        Category:targetDiseaseId[0]
      });
    }
  }
  return bubbleArray;
}
function removeRow(idOfReverseRow,idOfCurrentRow){
  for(i=0; i< data.length;i++){
    if(data[i][0] == idOfReverseRow && data[i][1] == idOfCurrentRow){
        data.splice(i,1);
    }
  }
}
function createLinks(id ,ShouldSkip = new Set(),layer = 0,returnArray = []){
    var selectedRows = data.filter(function(x){
        return x[0] == id;
    });
    for(currentRow of selectedRows){
    var sourceID = currentRow[0];
    var targetID = currentRow[1];
    if(currentRow[2] >= 50){
        returnArray.push({
        source:sourceID,
        target:targetID,
        weight:currentRow[2]
        })
    }
        ShouldSkip.add(sourceID);
        if(ShouldSkip.has(targetID)){
            continue;
        }
        returnArray.concat(createLinks(targetID,ShouldSkip,layer+1,returnArray))
    }
   return returnArray;
}
function getCount(arr){
    return getDisease(arr).size;
}
function getDisease(arr){
    var firstDisease = arr.map(x=>x.source);
    var secundDisease = arr.map(x=>x.target);
    return new Set(firstDisease.concat(secundDisease));
}
function merge(arrOne,arrTwo){
    arrTwo.forEach(element => {
        if(!arrOne.find(x=>x.source == element.source && x.target == element.target)){
            arrOne.push(element);
        }
    });
    return arrOne;
}

function getArrayOfArrays(){
    var ss = Array.from(new Set(data.map(x=>x[0])));
var ArrayOfArrays = [];
var arr = [];
for(var test of ss){
    var result = createLinks(test);
    arr = merge(arr,result);
    var count = getCount(arr);
    console.log(count)
    if(count>maxDisease){
        console.log(arr)
        ArrayOfArrays.push({
        links:arr,
        bubbles:getBubblesForLinks(arr)
        });
        arr = [];
    }
}
ArrayOfArrays.push({
    links:arr,
    bubbles:getBubblesForLinks(arr)})
return ArrayOfArrays;
}
var nor = normalizeData();
function getBubblesForLinks(arr){
    var all = getDisease(arr);
  return nor.filter(x=>all.has(x.Id));
}
export default getArrayOfArrays;