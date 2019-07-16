import React, { Component } from "react";
import * as d3 from "d3";
import { forceCluster } from 'd3-force-cluster'
class BubbleChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
    this.state = {
      data: this.props.data
    };
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }

  calculateColors(data) {
    var categories = data.map(x => x.Category);
    var filteredCategories = [];
    var ind = 0;
    categories.forEach(element => {
      if (!filteredCategories.includes(element)) {
        filteredCategories[ind] = element;
        ind++;
      }
    });
    var startIndex = 360.0 / filteredCategories.length;
    var str;
    var startString = "hsla(";
    var endString = ", 60%, 60%, 1)";
    var colors = [];
    for (var i = 0; i < filteredCategories.length; i++) {
      str = i * startIndex;
      colors[i] = startString + str + endString;
    }
    return colors;
  }

  createBarChart() {{
    var width = window.screen.width;
    var height = window.screen.height;
    const node = this.node;
    var links = this.props.links;
    var data = this.props.data;
    var colors = this.calculateColors(this.state.data);

    var clusters = [{
      NumberOfAppearances: 42,
      Category: 1,
      Name: "Disease 3",
      cluster: 1, 
      radius : 42
    }, 30, 102]
      
    var simulation = d3
      .forceSimulation()
      .force("x", d3.forceX().strength(0.5))
      .force("y", d3.forceY().strength(0.5))
      .force(
        "forceCollide",
        d3.forceCollide(function(d) {
          return d.NumberOfAppearances + 10 ;
        })
      )
      .force('cluster', forceCluster()
    .centers(function (d) { return clusters[d.cluster]; })
    .strength(0.7)
    .centerInertia(0.1))
      .force("link", d3.forceLink());

    

    var svg = d3
      .select(node)
      .append("g")
      .attr("transform", "translate(" + 300 + "," + 300 + ")");

      

    var radiusScale = d3
      .scaleSqrt()
      .domain([
        Math.min.apply(null, data.map(d => d.NumberOfAppearances)),
        Math.max.apply(null, data.map(d => d.NumberOfAppearances))
      ])
      .range([7, 35]);

    var linkScale = d3
      .scaleLinear()
      .domain([
        Math.min.apply(null, links.map(d => d.weight)),
        Math.max.apply(null, links.map(d => d.weight))
      ])
      .range([1, 7]);      

    var link = svg
    .selectAll(".link")
    .append("g")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "hsla(0, 0%, 40%, 0.58)")
    .attr("stroke-width", function(d, i) {
      return linkScale(links[i].weight);
    });

    var circles = svg
      .selectAll(".circles")
      .data(this.state.data)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("stroke", "black")
      .attr("id", function(d, i) {
        return i;
      })
      .attr("r", function(d) {
        return radiusScale(d.NumberOfAppearances);
      })
      .attr("fill", function(d) {
        return colors[d.Category - 1];
      })
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    var text = svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text");

    function handleMouseOver(d, i) {
      if (radiusScale(d.NumberOfAppearances) > 15) return;

      svg
        .append("text")
        .attr('y', function(){
          return d.y - 10;
        })
        .attr('x', function(){
          return d.x - 10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .text(function() {
          return [d.Name];
        })        
        .attr("id", "hoverId");
    }

    function handleMouseOut(d, i) {
      d3.select("#hoverId").remove();
    }

    simulation.nodes(this.state.data)
    .on('tick', layoutTick)

    simulation.force("link").links(link);

   

        function layoutTick (e) {
         
        circles
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      link
        .attr("x1", function(d) {
          return data[d.source].x;
        })
        .attr("y1", function(d) {
          return data[d.source].y;
        })
        .attr("x2", function(d) {
          return data[d.target].x;
        })
        .attr("y2", function(d) {
          return data[d.target].y;
        });

      text
        .attr("x", function(d, i) {
          return data[i].x - 23;
        })
        .attr("y", function(d, i) {
          return data[i].y + 10;
        })
        .text(function(d, i) {
          return radiusScale(data[i].NumberOfAppearances) > 15 ? d.Name : "";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
      }
 
    
  }}

  render() {
    return (
      <svg ref={node => (this.node = node)} width={1500} height={1200}></svg>
    );
  }
}
export default BubbleChart;
