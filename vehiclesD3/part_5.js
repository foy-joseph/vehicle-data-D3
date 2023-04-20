// graph for displaying all registered vehicles in a selected year
// total tractors, motor_cycles, goods vehicles, private cars in pie chart

export function doPart_5(){
    
    document.getElementById("chartTitle").innerHTML = "Total Tractor, MotorCycle, Good Vehicles & private car sales since 2019";
    document.querySelector('#part2Buttons').innerHTML = '';
    document.querySelector('span').innerHTML = '';

    var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    // Load the data from the CSV file
    d3.csv('vehicles.csv').then(function(data) {

        var filteredData = data.filter(function(d) {
            return (
                d.Taxation_Class === 'Secondhand_Tractors' || d.Taxation_Class === 'New_Tractors' || 
                d.Taxation_Class === 'Secondhand_Motor_Cycles' || d.Taxation_Class === 'New Motor_Cycles' ||
                d.Taxation_Class === 'Secondhand_Private_Cars' || d.Taxation_Class === 'New_Private_Cars' ||
                d.Taxation_Class === 'Secondhand_Goods_Vehicles' || d.Taxation_Class === 'New Goods Vehicles'
            );
        });

        let tractorsTotal = 0, motorCyclesTotal = 0, privateCarsTotal = 0, goodsVehiclesTotal = 0;
        for (let i = 0; i < filteredData.length; i++) {
            if(filteredData[i].Taxation_Class.toLowerCase().includes('tractors')){
                tractorsTotal+= +filteredData[i].VALUE;
            }
            else if(filteredData[i].Taxation_Class.toLowerCase().includes('cycles')){
                motorCyclesTotal+= +filteredData[i].VALUE;
            }
            else if(filteredData[i].Taxation_Class.toLowerCase().includes('cars')){
                privateCarsTotal+= +filteredData[i].VALUE;
            }
            else if(filteredData[i].Taxation_Class.toLowerCase().includes('goods')){
                goodsVehiclesTotal+= +filteredData[i].VALUE;
            }
        }


        let pieData = [
            {
                title: 'Tractors', 
                value: tractorsTotal
            },
            {
                title: 'Motor-Cycles', 
                value: motorCyclesTotal
            },
            {
                title: 'Private Cars', 
                value: privateCarsTotal
            },
            {
                title: 'Goods Vehicles', 
                value: goodsVehiclesTotal
            }
        ]
        
        console.log(pieData)

        let max  = d3.max(pieData, d => d.value);
        let min  = d3.min(pieData, d => d.value);

        console.log("max = " + max + ", min = " + min);



        
      



        let radius = Math.min(width, height) / 2 -10;

        let colourScale = d3.scaleSequential(d3.interpolate("red", "orange"))
            .domain([min, max]);
        
        let svg = d3.select("span")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width/2 + "," + height / 2 + ")");

        let pie = d3.pie()
            .value(function(d, i) {return pieData[i].value; })
            .sort(null);


        // Constructs a new arc generator with the default innerRadius-, outerRadius-, startAngle- and endAngle-accessor functions.  
        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        svg.selectAll('pies')
            .data(pie(pieData))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => { return colourScale(+pieData[i].value) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        const arcLabel = d3.arc()
            .innerRadius(200)
            .outerRadius(200);
            
        svg.selectAll('pies')
            .data(pie(pieData))
            .enter()
            .append('text')
            .text(function(d, i){ return `${pieData[i].title}`})
            .attr("transform", function(d, i) { 
                if(pieData[i].title == 'Motor-Cycles') return "translate(" + arcLabel.centroid(d) + ")";  
                else return "translate(" + arc.centroid(d) + ")";  
            })
            .style("text-anchor", "middle")
            .style("font-size", 12)


    });

}