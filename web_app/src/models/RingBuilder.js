import Ring from './Ring';
class RingBuilder{
    constructor(data,originalCenter){
      this.data=data
      this.originalCenter=originalCenter;
      var result = data.find(x=>x[0]==originalCenter);
      if(!result)
        throw "Center not found";
      this.centerRing = new Ring(result[0],0,result[0])
    }
    build(center = this.originalCenter ,ring = this.centerRing){
      var result = this.data.filter(x => x[0] == center);
      result.forEach(x=>{
        var innerRing = new Ring(x[1],x[2],x[1])
        this.build(x[1],innerRing);
        ring.addChild(innerRing);
      });
      return ring;
    }
  }
  export default RingBuilder