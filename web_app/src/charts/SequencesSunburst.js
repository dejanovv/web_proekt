import React, { Component } from "react";
import * as d3 from "d3";
import RingBuilder from '../models/RingBuilder';
import getSequencesData  from "../services/sequencesData.js"
import "../style.css"

class SequencesSunburst extends Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.state = {
      data: this.props.data,
      originalCenter:this.props.originalCenter,
      diseaseIds: this.props.diseaseIds
    };
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    d3.select("#chart>svg").remove()
    d3.select("#legend>svg").remove()
    this.createChart();
  }
  createChart(){
    var builder = new RingBuilder(this.state.data,this.state.originalCenter)
    var root = builder.build();

    var width = 750;
    var height = 600;
    var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    var b = {
      w: 75, h: 30, s: 3, t: 10
    };

// Mapping of step names to colors
// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 
var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.partition()
    .size([2 * Math.PI, radius * radius]);

var arc = d3.arc()
    .startAngle(function(d) { return d.x0; })
    .endAngle(function(d) { return d.x1; })
    .innerRadius(function(d) { return Math.sqrt(d.y0); })
    .outerRadius(function(d) { return Math.sqrt(d.y1); });


    createVisualization(root);

    function createVisualization(json) {
      
  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // Turn the data into a d3 hierarchy and calculate the sums.
  var root = d3.hierarchy(json)
      .sum(function(d) { return d.occurrence; })
      .sort(function(a, b) { return b.value - a.value; });
  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition(root).descendants()
      .filter(function(d) {
          return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
      });
  drawLegend(nodes);
  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return d.data.color})
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.datum().value;
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  d3.select("#percentage")
      .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");

  var sequenceArray = d.ancestors().reverse();
  sequenceArray.shift(); // remove root node from the array
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .on("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .style("visibility", "hidden");
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var trail = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.data.name + d.depth; });

  // Remove exiting nodes.
  trail.exit().remove();

  // Add breadcrumb and label for entering nodes.
  var entering = trail.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return d.data.color; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.data.name; });

  // Merge enter and update selections; set position for all nodes.
  entering.merge(trail).attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

function drawLegend(desc) {
  var li = {
    w: 75, h: 30, s: 3, r: 3
  };
  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", desc.length * (li.h + li.s));
  var g = legend.selectAll("g")
      .data(d3.entries(desc))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });
  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value.data.color; });
  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.value.data.name; });
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
    var result = e.target.value;
    if(this.state.diseaseIds.some(x => x == result)){
      var data = getSequencesData(result);
      this.setState((prevState) => {
        return {
          sequencesData:data,
          originalCenter:result,
          diseaseIds: prevState.diseaseIds
          }
        })
      }
      e.target.value = null;
      }
  }
  render() {
    return (
      
           
        <div className="flex-center">
        <div id="main">
        <input 
              className="search" 
              list="search" 
              type="search" 
              onKeyDown={this._handleKeyDown} 
              placeholder="Search a disease..."/>
              <datalist id="search">
              {
                this.state.diseaseIds.map( x => (<option value={x}>{x}</option>))
              }
            </datalist>
            <div id="sequence"></div>
            <div id="chart">
              <div id="explanation" >
                <span id="percentage"></span><br/>
              </div>
            </div>
          </div>
          <div id="sidebar">
            <input type="checkbox" id="togglelegend"/> Legend<br/>
            <div id="legend" ></div>
          </div>
      <div id="chart"></div>
    </div>
    );
  }
}
export default SequencesSunburst;
