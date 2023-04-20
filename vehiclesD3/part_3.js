//graph highlighting the differences in registration of private and second-hand vehicles over the past five years


export function doPart_3(){

    const years=['New-2019', 'Used-2019', 'New-2020', 'Used-2020','New-2021', 'Used-2021','New-2022', 'Used-2022','New-2023', 'Used-2023',];
    
    document.querySelector('span').innerHTML = "";

    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    // Load the data from the CSV file
    d3.csv('vehicles.csv').then(function(data) {

        document.getElementById("chartTitle").innerHTML = "New & Used Private Vehicles By Year";
        document.querySelector('#part2Buttons').innerHTML = '';

        let privateNew = [];
        let privateUsed = [];
        let totalNew = [ 0, 0, 0, 0, 0];
        let totalUsed = [ 0, 0, 0, 0, 0];
        
        // Filter the data where 'Taxation_Class' is 'New_Private_Cars' and the year is 2019+i
        for (let i = 0; i < 5; i++) {
            privateNew[i] = data.filter(function(d) {
                if(d.Taxation_Class == 'New_Private_Cars' && d.Month.startsWith(`${2019+i}`) && d !== undefined){
                    totalNew[i] += +d.VALUE;
                    console.log(d)
                    return d;
                };
            });
        }

        // Filter the data where 'Taxation_Class' is 'Secondhand_Private_Cars' and the year is 2019+i
        for (let j = 0; j < 5; j++) {
            privateUsed[j] = data.filter(function(d) {
                if(d.Taxation_Class == 'Secondhand_Private_Cars' && d.Month.startsWith(`${2019+j}`) && d !== undefined){
                    totalUsed[j] += +d.VALUE;
                    return d;
                };
            });
        }

        // year:
        // type: 
        // total: 

        let objectsArray = [];
        let year = 2019;
        for (let i = 0; i < 10; i+=2) {
            objectsArray[i] = {
                Year: year, 
                type: 'New',
                total: totalNew[year-2019]
            }
            objectsArray[i+1] = {
                Year: year,
                type: 'Used',
                total: totalUsed[year-2019]
            }
            year++;
            
        }



        console.log(objectsArray)


        let max = d3.max(objectsArray, d => d.total);
        console.log("max = " + max);



        const svg = d3.select("span")
            .append("svg")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height])
            .style("border", "2px solid black");


        const xScale = d3.scaleBand()
            .domain(d3.range(objectsArray.length))
            .range([margin.left, width - margin.right])
        const yScale = d3.scaleLinear()
            .domain([0, max])
            .range([height - margin.bottom, margin.top]);

        svg.append('g')
            .selectAll('rect')
            .data(objectsArray)
            .join('rect')
            .attr('x', (d, i) => {
                if(d.type == 'New') return xScale(i)+5;
                else return xScale(i)-5
            })
            .attr('y', d => yScale(d.total) )
            .attr('height', d => yScale(0) - yScale(d.total) )
            .attr('width', (d, i)=>{
                if(d.type == 'New') return xScale.bandwidth()+8;
                else return xScale.bandwidth()-2;
            })
            .attr('fill', function (d, i) {
                if(d.type == 'Used') return 'red';
                else return 'orange';
            })

        function xAxis(g) {
            g.call(d3.axisBottom(xScale)
                .ticks(5)
                .tickFormat( i => years[i] ))
            }
        function yAxis(g) {
            g.call(d3.axisLeft(yScale)
            .ticks( null, objectsArray.format))
        }

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll('text')
            // .attr("transform", "rotate(-65)");

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0 )`)
            .call(yAxis);

                
    });

}