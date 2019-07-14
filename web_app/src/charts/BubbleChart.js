import React, { Component } from 'react'
import * as d3 from 'd3';
class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
      this.state = {
        data: this.props.data
      }
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }

   calculateColors(data){
      var startIndex = 360.0 / data.length;
      var str;
      var startString = "hsla(";
      var endString = ", 60%, 60%, 1)";
      for (var i=0; i<data.length; i++){
        str = (i * startIndex);
        data[i].Color = startString + str + endString;
      }
   }
   createBarChart() {
      const node = this.node
      var links = this.props.links
      var data = this.props.data
      this.calculateColors(this.state.data);

      var simulation = d3.forceSimulation()
      .force('x', d3.forceX().strength(0.5))
      .force('y', d3.forceY().strength(0.5))
      .force('forceCollide', d3.forceCollide(function(d){
        return d.circle + 8;
      }))
      .force('link', d3.forceLink())

      var svg = d3.select(node)
      .append('g')
      .attr('transform', 'translate(250,250)');      

      var radiusScale = d3.scaleSqrt().domain([1,300]).range([10, 80]);
      var linkScale = d3.scaleLinear().domain([Math.min.apply(null, links.map(d => d.weight)), Math.max.apply(null, links.map(d => d.weight))]).range([0.5, 10])

      var circles = svg.selectAll('.circles')
      .data(this.state.data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('id', function(d,i){
        return i;
      })
      .attr('r', function(d){
        return radiusScale(d.circle)
      })
      .attr('fill', function(d){
          return d.Color;
      })
      .on('click', function(d){
        console.log(d);
      })    

      var link = svg.selectAll('.link')
      .append('g')
      .data(links)
      .enter().append('line')
               .attr('class', 'link')
     .attr("stroke", function(d,i){
      return data[d.source].Color;
      })
      .attr('stroke-width', function(d,i){
      return linkScale(links[i].weight)
})
          

      simulation.nodes(this.state.data)
      .on('tick', ticked);

      simulation.force('link')
            .links(link);

      function ticked(){
        circles
        .attr('cx', function(d){
          return d.x
        })
        .attr('cy', function(d){
          return d.y
        })      

        link.attr("x1", function(d) { return data[d.source].x; })
            .attr("y1", function(d) { return data[d.source].y; })
            .attr("x2", function(d) { return data[d.target].x; })
            .attr("y2", function(d) { return data[d.target].y; });
      }   
   }
render() {
      return <svg ref={node => this.node = node}
      width={900} height={900}>
      </svg>
   }
}
export default BarChart;