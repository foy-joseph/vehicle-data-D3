// graph on tractor registrations per month
// one pie chart for used and one for new


export function doPart_4(){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    
    document.querySelector('span').innerHTML = "";

    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 960*1.3 - margin.left - margin.right;
    var height = 550 - margin.top - margin.bottom;

    // Load the data from the CSV file
    d3.csv('vehicles.csv').then(function(data) {

        document.getElementById("chartTitle").innerHTML = "New & Used Tractors Total by Months";
        document.querySelector('#part2Buttons').innerHTML = '';

        // var filteredData = data.filter(function(d) {
        //     return d.Month.startsWith('2019') && (d.Taxation_Class === 'Secondhand_Tractors' || d.Taxation_Class === 'New_Tractors');
        // });

        let usedByMonth = [];
        let usedTotalByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let m = 0; m < 12; m++) {
            usedByMonth[m] = data.filter(function(d) {
                if(d.Taxation_Class === 'Secondhand_Tractors' &&    d.Month.substr(5, d.Month.length) == m+1   ){
                    usedTotalByMonth[m] += +d.VALUE;
                    return d;
                }
            });
            
        }

        let newByMonth = [];
        let newTotalByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let m = 0; m < 12; m++) {
            newByMonth[m] = data.filter(function(d) {
                if(d.Taxation_Class === 'New_Tractors' &&    d.Month.substr(5, d.Month.length) == m+1   ){
                    newTotalByMonth[m] += +d.VALUE;
                    return d;
                }
            });
            
        }

        console.log(usedTotalByMonth)
        console.log(newTotalByMonth)

        let max  = Math.max(d3.max(usedTotalByMonth, d => d), d3.max(newTotalByMonth, d => d));
        console.log("max = " + max);

        // let totalUsedTractors = usedTotalByMonth.reduce((accumulator, value) => {
        //     return accumulator + value;
        //   }, 0);
        // let totalNewTractors = newTotalByMonth.reduce((accumulator, value) => {
        //     return accumulator + value;
        //   }, 0);

        // console.log('Used total: '+ totalUsedTractors + ", New Total: "+ totalNewTractors)



        /////////////////
        // Used Tractors
        /////////////////

        // find the min of width and height and devided by 2
        let radius = Math.min(width, height) / 2 -10;

        let colourScale = d3.scaleSequential(d3.interpolate("red", "yellow"))
            .domain([785, 1205]);
        
        let svg = d3.select("span")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width/4  + "," + height / 2.1 + ")");

        let pie = d3.pie()
            .value(function(d, i) {return usedTotalByMonth[i]; })
            .sort(null);


        // Constructs a new arc generator with the default innerRadius-, outerRadius-, startAngle- and endAngle-accessor functions.  
        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        svg.selectAll('pies')
            .data(pie(usedTotalByMonth))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => { return colourScale(+usedTotalByMonth[i]) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            
        svg.selectAll('pies')
            .data(pie(usedTotalByMonth))
            .enter()
            .append('text')
            .text(function(d, i){ return `${months[i]} - ${usedTotalByMonth[i]}`})
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 12)

        svg.append('text')
            .text('Total Used Tractors Registered')
            .style("text-anchor", "middle")
            .style("font-size", 24)
            .attr("transform", "translate(0," + height / 1.95 + ")");




        
        /////////////////
        // New Tractors
        /////////////////

        

        let colourScale2 = d3.scaleSequential(d3.interpolate("#04048B", "#F0F8FF "))
            .domain([260, max]);
        

        let svg2 = d3.select("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + 3.4*radius  + "," + height / 2.1 + ")");

        let pie2 = d3.pie()
            .value(function(d, i) {return newTotalByMonth[i]; })
            .sort(null);


        let arc2 = d3.arc()
            .innerRadius(radius/4)
            .outerRadius(radius)

        svg2.selectAll('pies2')
            .data(pie2(newTotalByMonth))
            .enter()
            .append('path')
            .attr('d', arc2)
            .attr('fill', (d, i) => { return colourScale2(+newTotalByMonth[i]) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            
        svg2.selectAll('pies2')
            .data(pie2(newTotalByMonth))
            .enter()
            .append('text')
            .text(function(d, i){ return `${months[i]} - ${newTotalByMonth[i]}`})
            .attr("transform", function(d) { return "translate(" + arc2.centroid(d) + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 12)

        svg2.append('text')
            .text('Total New Tractors Registered')
            .style("text-anchor", "middle")
            .style("font-size", 24)
            .attr("transform", "translate(0," + (height/1.95) + ")");

    });

}