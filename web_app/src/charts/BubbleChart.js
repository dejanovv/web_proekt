import React, { Component } from "react";
import * as d3 from "d3";
class BarChart extends Component {
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
    var i = 0;
    categories.forEach(element => {
      if (!filteredCategories.includes(element)) {
        filteredCategories[i] = element;
        i++;
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

  createBarChart() {
    const node = this.node;
    var links = this.props.links;
    var data = this.props.data;
    var colors = this.calculateColors(this.state.data);

    var simulation = d3
      .forceSimulation()
      .force("x", d3.forceX().strength(0.5))
      .force("y", d3.forceY().strength(0.5))
      .force(
        "forceCollide",
        d3.forceCollide(function(d) {
          return d.circle + 8;
        })
      )
      .force("link", d3.forceLink());

    var svg = d3
      .select(node)
      .append("g")
      .attr("transform", "translate(250,250)");

    var radiusScale = d3
      .scaleSqrt()
      .domain([1, 300])
      .range([10, 80]);
    var linkScale = d3
      .scaleLinear()
      .domain([
        Math.min.apply(null, links.map(d => d.weight)),
        Math.max.apply(null, links.map(d => d.weight))
      ])
      .range([0.5, 10]);

      

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
        return radiusScale(d.circle);
      })
      .attr("fill", function(d) {
        return colors[d.Category - 1];
      })
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    var textt = svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text");

    function handleMouseOver(d, i) {
      if (radiusScale(d.circle) > 25) return;

      svg
        .append("text")
        .attr('y', function(d, i){
          return data[i].x + 70;
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
      d3.select("#hoverId").remove(); // Remove text location
    }

    simulation.nodes(this.state.data).on("tick", ticked);

    simulation.force("link").links(link);

    function ticked() {
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

      textt
        .attr("x", function(d, i) {
          return data[i].x - 23;
        })
        .attr("y", function(d, i) {
          return data[i].y;
        })
        .text(function(d, i) {
          return radiusScale(data[i].circle) > 25 ? d.Name : "";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
    }
  }

  render() {
    return (
      <svg ref={node => (this.node = node)} width={900} height={900}></svg>
    );
  }
}
export default BarChart;
