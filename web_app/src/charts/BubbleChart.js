
import React, {
    Component
  } from "react";
  import * as d3 from "d3";
  import * as _ from 'underscore';
  class BubbleChart extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
        this.getNumberOfCategories = this.getNumberOfCategories.bind(this);
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
  
    getNumberOfCategories(data){
        var categories = new Set(data.map(x => x.Category));
        return categories.size;
    }
  
  
    createBarChart() {let margin = {top: 100, right: 100, bottom: 100, left: 100};
     let data = this.props.data;
     let links = this.props.links;
    let width = 1500,
        height = 900,
        padding = 20, // separation between same-color circles
        clusterPadding = 40, // separation between different-color circles
        maxRadius = 22;
  
        var radiusScale = d3
                .scaleSqrt()
                .domain([
                    Math.min.apply(null, data.map(d => d.NumberOfAppearances)),
                    Math.max.apply(null, data.map(d => d.NumberOfAppearances))
                ])
                .range([5, 22]);
  
            var linkScale = d3
                .scaleLinear()
                .domain([
                    Math.min.apply(null, links.map(d => d.weight)),
                    Math.max.apply(null, links.map(d => d.weight))
                ])
                .range([1, 7]);
        
    let n = data.length, // total number of nodes
        m = this.getNumberOfCategories(data), // number of distinct clusters
        z = d3.scaleOrdinal(d3.schemeAccent),
        clusters = new Array(m);
    
    let svg = d3.select('.bubbleChart')
        .append('svg')
        .attr('height', "100%")
        .attr('width', "100%")
        .append('g').attr('transform', 'translate(' + 1600 / 2 + ',' + 1600 / 2 + ')')
    
    let nodes = data.map((el) => {
        let i = el.Category,
            radius = radiusScale(el.NumberOfAppearances),          
            d = {cluster: i, r: radius, name: el.Name};
        if (!clusters[i] || (radius > clusters[i].r)) clusters[i] = d;
        return d;
    });

    var link = svg
              .selectAll(".link")
              .append("g")
              .data(links)
              .enter()
              .append("line")
              .attr("class", "link")
              .attr("stroke", "hsla(0, 0%, 10%, 0.58)")
              .attr("stroke-width", function(d, i) {
                  return linkScale(links[i].weight);
              });
    
    let circles = svg.append('g')
          .datum(nodes)
        .selectAll('.circle')
          .data(d => d)
        .enter().append('circle')
          .attr('r', (d) => d.r)
          .attr('fill', (d) => z(d.cluster))
          .attr('stroke', 'black')
          .attr('stroke-width', 0.3)
          .attr("name", function(d, i) {
              return d.Name;
          })
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);
  
          var text = svg
          .selectAll("text")
          .data(nodes)
          .enter()
          .append("text");  
    
    let simulation = d3.forceSimulation(nodes)
        .velocityDecay(0.2)
        .force("x", d3.forceX().strength(.0005))
        .force("y", d3.forceY().strength(.0005))
        .force("link", d3.forceLink())
        .force("collide", collide)
        .force("cluster", clustering)
        .on("tick", ticked);
    
    function ticked() {
        circles
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)

  
         text.
         attr("x", function(d){
             return d.x - (d.name.length + d.r) /2;
         })
         .attr("y", function(d){
            return d.y;
        })
         .text(function(d,i){
             return d.r > 17 ? d.name : "";
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "10px")
         .attr("fill", "black");;

         link
         .attr("x1", function(d) {
             return nodes[d.source].x;
         })
         .attr("y1", function(d) {
             return nodes[d.source].y;
         })
         .attr("x2", function(d) {
             return nodes[d.target].x;
         })
         .attr("y2", function(d) {
             return nodes[d.target].y;
         });
    }   
    
    // These are implementations of the custom forces.
    function clustering(alpha) {
        nodes.forEach(function(d) {
          var cluster = clusters[d.cluster];
          if (cluster === d) return;
          var x = d.x - cluster.x,
              y = d.y - cluster.y,
              l = Math.sqrt(x * x + y * y),
              r = d.r + cluster.r;
          if (l !== r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            cluster.x += x;
            cluster.y += y;
          }  
        });
    }
    
    function collide(alpha) {
      var quadtree = d3.quadtree()
          .x((d) => d.x)
          .y((d) => d.y)
          .addAll(nodes);
    
      nodes.forEach(function(d) {
        var r = d.r + maxRadius + Math.max(padding, clusterPadding) + 30,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
    
          if (quad.data && (quad.data !== d)) {
            var x = d.x - quad.data.x,
                y = d.y - quad.data.y,
                l = Math.sqrt(x * x + y * y),
                r = d.r + quad.data.r + (d.cluster === quad.data.cluster ? padding : clusterPadding) ;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.data.x += x;
              quad.data.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      });
    }
    function handleMouseOver(d, i) {
      if (d.r > 17) return;
  
      svg
          .append("text")
          .attr('y', function() {
              return d.y;
          })
          .attr('x', function() {
              return d.x - (d.r) / 2;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("fill", "black")
          .text(function() {
              return d.name;
          })
          .attr("id", "hoverId");
  }
  
  function handleMouseOut() {
      d3.select("#hoverId").remove();
  }
  }
    render() {
        return ( 
            <div className="bubbleChart" style={{width: 1662, height: 1600}}></div>
        );
    }
  }
  export default BubbleChart;
