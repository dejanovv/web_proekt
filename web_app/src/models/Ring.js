var colors = [
    "#5687d1",
    "#7b615c",
    "#de783b",
    "#6ab975",
    "#a173d1",
   "#bbbbbb"
   ];
   
class Ring{
    constructor(id,occurrence,name){
      this.occurrence = occurrence;
      this.id = id;
      this.name = name
      this.children = [];
      this.color = colors[Math.round(Math.random()*6)];
    }
  
    addChild(ring){
        this.children.push(ring);
    }
    isLeaf(){
        return this.children.length==0;
    }
  }
export default Ring;