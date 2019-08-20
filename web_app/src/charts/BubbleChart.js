import React, {
  Component
} from "react";
import * as d3 from "d3";
import * as _ from 'underscore';
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


  createBarChart() {
      {
          const node = this.node;
          var links = this.props.links;
          var data = this.props.data.sort((x,y) => { return x.Category - y.Category });
          var width = 1300,
              height = 1000,
              padding = 3, // separation between same-color nodes
              clusterPadding = 10, // separation between different-color nodes
              maxRadius = 25;

          var n = 200, // total number of nodes
              m = 40; // number of distinct clusters

          var clusters = new Array(m);
          var color = d3.scaleSequential(d3.interpolateRainbow)
              .domain(d3.range(m));

          var radiusScale = d3
              .scaleSqrt()
              .domain([
                  Math.min.apply(null, data.map(d => d.NumberOfAppearances)),
                  Math.max.apply(null, data.map(d => d.NumberOfAppearances))
              ])
              .range([5, 25]);

          var linkScale = d3
              .scaleLinear()
              .domain([
                  Math.min.apply(null, links.map(d => d.weight)),
                  Math.max.apply(null, links.map(d => d.weight))
              ])
              .range([1, 7]);
          var nodes = data.map(function(element) {
              var i = element.Category,
                  r = radiusScale(element.NumberOfAppearances),
                  d = {
                      cluster: i,
                      radius: r,
                      x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
                      y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random(),
                      name: element.Name
                  };

              if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
              return d;
          });

          var force = d3.forceSimulation()
              // keep entire simulation balanced around screen center
              .force('center', d3.forceCenter(width / 2, height / 2))
              // cluster by section
              .force('cluster', cluster()
                  .strength(1))

              // apply collision with padding
              .force('collide', d3.forceCollide(d => d.radius + padding)
                  .strength(0.7))
              .force("link", d3.forceLink())
              .nodes(nodes)
              //don't show animation
              .stop();

          var svg = d3.select(node).append("svg")
              .attr("width", width)
              .attr("height", height)
              .attr("transform", "translate(0,0)");

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

          var circles = svg.selectAll("circle")
              .data(nodes)
              .enter().append("circle")
              .style("fill", function(d) {
                  return color(d.cluster / 39);
              })
              .attr("id", function(d, i) {
                  return i;
              })
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

          //wait until the circles are all positioned instead of seeing the animation
          for (var i = 0; i < 500; ++i) force.tick();
          layoutTick();

          function layoutTick(e) {
              circles
                  .attr("cx", function(d) {
                      return d.x;
                  })
                  .attr("cy", function(d) {
                      return d.y;
                  })
                  .attr("r", function(d) {
                      return d.radius;
                  });

              text
                  .attr("x", function(d, i) {
                      return d.x - d.name.length * 2.1;
                  })
                  .attr("y", function(d, i) {
                      return d.y;
                  })
                  .text(function(d, i) {
                      return d.radius > 17 ? d.name : "";
                  })
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "10px")
                  .attr("fill", "black");

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

          // Move d to be adjacent to the cluster node.
          function cluster() {
              var nodes,
                  strength = 0.1;

              function force(alpha) {

                  // scale + curve alpha value
                  alpha *= strength * alpha;

                  nodes.forEach(function(d) {
                      var cluster = clusters[d.cluster];
                      if (cluster === d) return;

                      let x = d.x - cluster.x,
                          y = d.y - cluster.y,
                          l = Math.sqrt(x * x + y * y),
                          r = d.radius + cluster.radius;

                      if (l != r) {
                          l = (l - r) / l * alpha;
                          d.x -= x *= l;
                          d.y -= y *= l;
                          cluster.x += x;
                          cluster.y += y;
                      }
                  });

              }

              force.initialize = function(_) {
                  nodes = _;
              }

              force.strength = _ => {
                  strength = _ == null ? strength : _;
                  return force;
              };

              return force;
          }

          function handleMouseOver(d, i) {
            if (d.radius > 17) return;

            svg
                .append("text")
                .attr('y', function() {
                    return d.y;
                })
                .attr('x', function() {
                    return d.x - (d.radius) / 2;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "black")
                .text(function() {
                    return [d.name];
                })
                .attr("id", "hoverId");
        }

        function handleMouseOut() {
            d3.select("#hoverId").remove();
        }

      }
  }

  render() {
      return ( <svg ref = {node => (this.node = node)} width = {1500} height = {1200}> </svg>
      );
  }
}
export default BubbleChart;