// graph displaying all new registered vehicles past five years.


export function doPart_1(){
    
    document.querySelector('span').innerHTML = "";

    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    // Load the data from the CSV file
    d3.csv('vehicles.csv').then(function(data) {

        document.querySelector('#part2Buttons').innerHTML = '';
        document.getElementById("chartTitle").innerHTML = "New Registered Vehicles by Year";
    
        // Filter the data where 'Taxation_Class' is 'Regs_For_Year'
        var filteredData = data.filter(function(d) {
            return d.Taxation_Class === 'Regs_For_Year';
        });
        
        // Create a new array with 'Taxation_Class' and 'VALUE' columns only
        let year=2018;
        var data = filteredData.map(function(d) {
            year++;
            return {
                Year: +year,
                VALUE: +d.VALUE // Convert VALUE to a number
            };
        });
        
        console.log(data)
        
        let max = d3.max(data, d => d.VALUE);
        console.log("max = " + max);

        const svg = d3.select("span")
            .append("svg")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height])
            .style("border", "2px solid black");

    // set scale range
        const xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
        const yScale = d3.scaleLinear()
            .domain([0, max])
            .range([height - margin.bottom, margin.top]);

        svg.append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d, i) => xScale(i)+4)
            .attr('y', d => yScale(d.VALUE) )
            .attr('height', d => yScale(0) - yScale(d.VALUE) )
            .attr('width', xScale.bandwidth()-8)
            .attr('fill', d => `rgb(    ${255-Math.floor(d.VALUE*(255/max))}   ,  ${Math.floor(d.VALUE*(255/max))}   ,0)`);

        function xAxis(g) {
            g.call(d3.axisBottom(xScale)
                .tickFormat( i => data[i].Year))
            }
        function yAxis(g) {
            g.call(d3.axisLeft(yScale)
            .ticks( null, data.format))
        }

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0 )`)
            .call(yAxis);

                
    });
}