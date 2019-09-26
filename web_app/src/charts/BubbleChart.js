import React, {
    Component
  } from "react";
  import * as d3 from "d3";
  import ReactPaginate from "react-paginate";

  class BubbleChart extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
        this.getNumberOfCategories = this.getNumberOfCategories.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.state = {
            data: this.props.data[0],
            pageNumber: 0
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

    onPageChange(e){
        d3.select(".bubbleChart>svg").remove();
        console.log(e);
        this.setState({
           pageNumber: e.selected
     })
     
    
    }
  
  
    createBarChart() {
     let data = this.props.bubbleData[this.state.pageNumber].bubbles;
     let links = this.props.bubbleData[this.state.pageNumber].links;;
    let padding = 55, // separation between same-color circles
        clusterPadding = 80, // separation between different-color circles
        maxRadius = 25;
        //map circles range 5-22
        var radiusScale = d3
            .scaleSqrt()
            .domain([
                Math.min.apply(null, data.map(d => d.NumberOfAppearances)),
                Math.max.apply(null, data.map(d => d.NumberOfAppearances))
            ])
            .range([5, 25]);
        
        //map links range 1-71
        var linkScale = d3
            .scaleLinear()
            .domain([
                Math.min.apply(null, links.map(d => d.weight)),
                Math.max.apply(null, links.map(d => d.weight))
            ])
            .range([1, 12]);
    
        
    let n = data.length, // total number of nodes
        m = this.getNumberOfCategories(data), // number of distinct clusters
        z = d3.scaleSequential().domain([1,m])
        .interpolator(d3.interpolateWarm), //color scale
        clusters = new Array(m),
        clusterSizes = new Array(m);
    
    let svg = d3.select('.bubbleChart')
        .append('svg')
        .attr('height', "100%")
        .attr('width', "100%")
        .attr('class', "svgg")
        .append('g').attr('transform', 'translate(' + 2500 / 2 + ',' + 2500 / 2 + ')')
    
    //map nodes and set the cluster to the largest circle in the category
    let nodes = data.map((el) => {
        let i = el.Category,
            radius = radiusScale(el.NumberOfAppearances),          
            d = {cluster: i, r: radius, name: el.Name, id: el.Id};
        if (!clusters[i] || (radius > clusters[i].r)){
             clusters[i] = d; 
             clusterSizes[i] = 0;
        }
        clusterSizes[i]++;
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
          .attr('fill', (d) => {
             if (d.cluster == "V") return z(12)
             if (d.cluster == "E" ) return z(20) 
             else return z(d.cluster * 10)})
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
    
    //define forces
    let simulation = d3.forceSimulation(nodes)
        .velocityDecay(0.2)
        .force("x", d3.forceX().strength(.0005))
        .force("y", d3.forceY().strength(.0005))
        .force("link", d3.forceLink().id(d => {return d.id}))
        .force("collide", collide)
        .force("cluster", clustering)
        .on("tick", ticked);
    
    //function for the simulation tick
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
             return d.r > 10 ? d.name : "";
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "9px")
         .attr("fill", "black");;

         link
         .attr("x1", function(d) {
             return nodes.find(x => x.id == d.source).x;
         })
         .attr("y1", function(d) {
            return nodes.find(x => x.id == d.source).y;
         })
         .attr("x2", function(d) {
            return nodes.find(x => x.id == d.target).x;
         })
         .attr("y2", function(d) {
            return nodes.find(x => x.id == d.target).y;
         });
    }   
    
    // Implementations of the custom forces.
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
                r = d.r + quad.data.r + (d.cluster === quad.data.cluster ? padding + clusterSizes[d.cluster]/3 -10 : clusterPadding) + 10;
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
      if (d.r > 10) return; //name is already shown
  
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
            <div>   
            <ReactPaginate 
            pageCount = {this.props.bubbleData.length}
            pageRangeDisplayed = {3}
            marginPagesDisplayed = {3}
            activeClassName = "active_page"
            containerClassName = "pagination_container"
            pageClassName = "page"
            disableInitialCallback = {true}
            onPageChange = {e => this.onPageChange(e)}
             />
             <div className="bubbleChart" style={{width: 2500, height: 2500}}></div>
             </div>
        );        
    }
  }
  export default BubbleChart;
