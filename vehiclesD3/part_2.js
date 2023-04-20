// graph for displaying all registered vehicles in a selected year

// create a line for each year - add separate buttons to hide/ show the other lines
// do a key at the bottom of the graph

export function doPart_2(){
    
    document.querySelector('span').innerHTML = "";

    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // Load the data from the CSV file
    d3.csv('vehicles.csv').then(function(data) {

        document.getElementById("chartTitle").innerHTML = "All Registered Vehicles in a Selected Year";
    
        var filteredData = data.filter(function(d) {
            return d.Taxation_Class === 'All_Vehicles';
        });
        
        let month=-1;
        let year=2019;

        // 
        var data = filteredData.map(function(d) {
            month++;
            if (month == 12){
                month = 0;
                year++;
            }
            return {
                Month: +month,
                Year: +year,
                VALUE: +d.VALUE // Convert VALUE to a number
            };
        });


        // filter the data for the specific years
        let data2019 = data.map(function(d) {
            if (d.Year == 2019){return d;}
        }).filter(function( element ) { // filter out undefined elements in array;
            return element !== undefined;
        });

        let data2020 = data.map(function(d) {
            if (d.Year == 2020){return d;}
        }).filter(function( element ) { // filter out undefined elements in array;
            return element !== undefined;
        });

        let data2021 = data.map(function(d) {
            if (d.Year == 2021){return d;}
        }).filter(function( element ) { // filter out undefined elements in array;
            return element !== undefined;
        });

        let data2022 = data.map(function(d) {
            if (d.Year == 2022){return d;}
        }).filter(function( element ) { // filter out undefined elements in array;
            return element !== undefined;
        });

        let data2023 = data.map(function(d) {
            if (d.Year == 2023){return d;}
        }).filter(function( element ) { // filter out undefined elements in array;
            return element !== undefined;
        });

        
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
            .domain(d3.range(data2019.length))
            .range([margin.left, width - margin.right])
        const yScale = d3.scaleLinear()
            .domain([0, max])
            .range([height - margin.bottom, margin.top]);

        var line = d3.line()
            .x(function(d) { return xScale(d.Month); }) 
            .y(function(d) { return yScale(d.VALUE); }) 
            .curve(d3.curveMonotoneX)


        let yearButtonsDiv = document.createElement('div')

        //append five buttons for the years:
        let button2019 = document.createElement('BUTTON');
        button2019.innerHTML = '2019';
        button2019.addEventListener('click', ()=>{
            svg.append("path")
                .datum(data2019) 
                .attr("class", "line") 
                .attr("transform", "translate(" + 25 + "," + 0 + ")")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "red")
                .style("stroke-width", "2")
            
            svg.append("text")
                .attr('text-anchor', 'middle')
                .attr("x", 750)
                .attr("y", yScale(data2019[11].VALUE))
                .text('2019')

            svg.selectAll("myCircles")
                .data(data2019)
                .enter()
                .append("circle")
                    .attr("fill", "red")
                    .attr("stroke", "none")
                    .attr("cx", function(d) { return xScale(d.Month)+25 })
                    .attr("cy", function(d) { return yScale(d.VALUE) })
                    .attr("r", 3)
        }); yearButtonsDiv.appendChild(button2019);

        console.log(data2019[11].VALUE)

        let button2020 = document.createElement('BUTTON');
        button2020.innerHTML = '2020';
        button2020.addEventListener('click', ()=>{
            svg.append("path")
                .datum(data2020) 
                .attr("class", "line") 
                .attr("transform", "translate(" + 25 + "," + 0 + ")")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "green")
                .style("stroke-width", "2");
                
            svg.append("text")
                .attr('text-anchor', 'middle')
                .attr("x", 750)
                .attr("y", yScale(data2020[11].VALUE))
                .text('2020')

            svg.selectAll("myCircles")
                .data(data2020)
                .enter()
                .append("circle")
                    .attr("fill", "green")
                    .attr("stroke", "none")
                    .attr("cx", function(d) { return xScale(d.Month)+25 })
                    .attr("cy", function(d) { return yScale(d.VALUE) })
                    .attr("r", 3)
        }); yearButtonsDiv.appendChild(button2020);

        let button2021 = document.createElement('BUTTON');
        button2021.innerHTML = '2021';
        button2021.addEventListener('click', ()=>{
            svg.append("path")
                .datum(data2021) 
                .attr("class", "line") 
                .attr("transform", "translate(" + 25 + "," + 0 + ")")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "blue")
                .style("stroke-width", "2")
            
            svg.append("text")
                .attr('text-anchor', 'middle')
                .attr("x", 750)
                .attr("y", yScale(data2021[11].VALUE))
                .text('2021')
            
            svg.selectAll("myCircles")
                .data(data2021)
                .enter()
                .append("circle")
                    .attr("fill", "blue")
                    .attr("stroke", "none")
                    .attr("cx", function(d) { return xScale(d.Month)+25 })
                    .attr("cy", function(d) { return yScale(d.VALUE) })
                    .attr("r", 3)
        }); yearButtonsDiv.appendChild(button2021);

        let button2022 = document.createElement('BUTTON');
        button2022.innerHTML = '2022';
        button2022.addEventListener('click', ()=>{
            svg.append("path")
                .datum(data2022) 
                .attr("class", "line") 
                .attr("transform", "translate(" + 25 + "," + 0 + ")")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "orange")
                .style("stroke-width", "2")
            
            svg.append("text")
                .attr('text-anchor', 'middle')
                .attr("x", 750)
                .attr("y", yScale(data2022[11].VALUE-500))
                .text('2022')

            svg.selectAll("myCircles")
                .data(data2022)
                .enter()
                .append("circle")
                    .attr("fill", "orange")
                    .attr("stroke", "none")
                    .attr("cx", function(d) { return xScale(d.Month)+25 })
                    .attr("cy", function(d) { return yScale(d.VALUE) })
                    .attr("r", 3)
        }); yearButtonsDiv.appendChild(button2022);

        let button2023 = document.createElement('BUTTON');
        button2023.innerHTML = '2023';
        button2023.addEventListener('click', ()=>{
            svg.append("path")
                .datum(data2023) 
                .attr("class", "line") 
                .attr("transform", "translate(" + 25 + "," + 0 + ")")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "purple")
                .style("stroke-width", "2")
            
            svg.append("text")
                .attr('text-anchor', 'middle')
                .attr("x", 750)
                .attr("y", yScale(data2022[0].VALUE))
                .text('2023')

            svg.selectAll("myCircles")
                .data(data2023)
                .enter()
                .append("circle")
                    .attr("fill", "purple")
                    .attr("stroke", "none")
                    .attr("cx", function(d) { return xScale(d.Month)+25 })
                    .attr("cy", function(d) { return yScale(d.VALUE) })
                    .attr("r", 3)   
        }); yearButtonsDiv.appendChild(button2023);

        document.querySelector('#part2Buttons').appendChild(yearButtonsDiv);

        function xAxis(g) {
            g.call(d3.axisBottom(xScale)
                .tickFormat( i => months[data[i].Month]))
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