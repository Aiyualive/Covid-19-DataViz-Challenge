const color = d3.schemeCategory10;
const margin = { top: 20, right: 5, bottom: 40, left: 100 };
const width = 480 - margin.left - margin.right;
const height = 480 - margin.top - margin.bottom;

const x = d3.scaleLinear()
    .range([0, width])
    .nice();

const y = d3.scaleLinear()
    .range([height, 0]);

const xAxis = d3.axisBottom(x).ticks(12),
    yAxis = d3.axisLeft(y).ticks(12 * height / width);

const xAxis2 = d3.axisBottom(x).ticks(12),
    yAxis2 = d3.axisLeft(y).ticks(12 * height / width);



let idleTimeout,
    idleDelay = 350;

d3.csv("gdpdata.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.x = +d.Confirmed;
        d.y = +d.gdp/1000000000;
    });

    console.log(data)

    const brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("end", brushended);

    const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const clip = svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0)
    .attr("y", 0);

    x.domain(d3.extent(data, d => d.x)).nice();
    y.domain(d3.extent(data, d => d.y)).nice();

    const scatter = svg.append("g")
        .attr("id", "scatterplot")
        .attr("clip-path", "url(#clip)");

    scatter.selectAll(".dot")
        .data(data)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("opacity", 0.6)
        .style("fill", (_, i) => color[i % 9]);;

    makeGrid();

    svg.append("g")
    .attr("class", "x axis")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("text")
    .style("text-anchor", "end")
    .attr("x", width - 4)
    .attr("y", height + 32)
    .text("Number of total cases");

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", -65)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("GDP($Billion)");

    scatter.append("g")
        .attr("class", "brush")
        .call(brush);

        function brushended() {
    const s = d3.event.selection;
    if (!s) {
        if (!idleTimeout) {
            return idleTimeout = setTimeout(() => {
            idleTimeout = null;
            }, idleDelay);
        }
        x.domain(d3.extent(data, d => d.x)).nice();
        y.domain(d3.extent(data, d => d.y)).nice();
    } else {
        x.domain([s[0][0], s[1][0]].map(x.invert, x));
        y.domain([s[1][1], s[0][1]].map(y.invert, y));
        scatter.select(".brush").call(brush.move, null);
    }
    zoom();
    }


    function makeGrid() {
    svg.insert("g", '#scatterplot')
        .attr("class", "grid grid-x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis2
        .tickSize(-height)
        .tickFormat(''));

    svg.insert("g", '#scatterplot')
        .attr("class", "grid grid-y")
        .call(yAxis2
        .tickSize(-width)
        .tickFormat(''));

    svg.selectAll('.grid')
        .selectAll('line')
        .attr('stroke', 'lightgray');
    }

    function zoom() {
    const t = scatter.transition().duration(750);
    svg.select("#axis--x").transition(t).call(xAxis);
    svg.select(".grid-x")
        .transition(t)
        .call(xAxis2
            .tickSize(-height)
            .tickFormat(''))
        .selectAll('line')
        .attr('stroke', 'lightgray');

    svg.select("#axis--y").transition(t).call(yAxis);
    svg.select(".grid-y")
        .transition(t)
        .call(yAxis2
            .tickSize(-width)
            .tickFormat(''))
        .selectAll('line')
        .attr('stroke', 'lightgray');

    scatter.selectAll("circle")
        .transition(t)
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y));
    }
    });
</script>
<script>
    const color = d3.schemeCategory10;
    const margin = { top: 20, right: 5, bottom: 40, left: 100 };
    const width = 480 - margin.left - margin.right;
    const height = 480 - margin.top - margin.bottom;

    const x = d3.scaleLinear()
        .range([0, width])
        .nice();

    const y = d3.scaleLinear()
        .range([height, 0]);

    const xAxis = d3.axisBottom(x).ticks(12),
        yAxis = d3.axisLeft(y).ticks(12 * height / width);

    const xAxis2 = d3.axisBottom(x).ticks(12),
        yAxis2 = d3.axisLeft(y).ticks(12 * height / width);



    let idleTimeout,
        idleDelay = 350;

    d3.csv("gdpdata.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.x = +d.Confirmed;
            d.y = +d.gdp/1000000000;
        });

        console.log(data)

        const brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on("end", brushended);

        const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

        x.domain(d3.extent(data, d => d.x)).nice();
        y.domain(d3.extent(data, d => d.y)).nice();

        const scatter = svg.append("g")
            .attr("id", "scatterplot")
            .attr("clip-path", "url(#clip)");

        scatter.selectAll(".dot")
            .data(data)
        .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5)
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("opacity", 0.6)
            .style("fill", (_, i) => color[i % 9]);;

        makeGrid();

        svg.append("g")
        .attr("class", "x axis")
        .attr('id', "axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

        svg.append("text")
        .style("text-anchor", "end")
        .attr("x", width - 4)
        .attr("y", height + 32)
        .text("Number of total cases");

        svg.append("g")
            .attr("class", "y axis")
            .attr('id', "axis--y")
            .call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", -65)
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .text("GDP($Billion)");

        scatter.append("g")
            .attr("class", "brush")
            .call(brush);

            function brushended() {
        const s = d3.event.selection;
        if (!s) {
            if (!idleTimeout) {
                return idleTimeout = setTimeout(() => {
                idleTimeout = null;
                }, idleDelay);
            }
            x.domain(d3.extent(data, d => d.x)).nice();
            y.domain(d3.extent(data, d => d.y)).nice();
        } else {
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            scatter.select(".brush").call(brush.move, null);
        }
        zoom();
        }


        function makeGrid() {
        svg.insert("g", '#scatterplot')
            .attr("class", "grid grid-x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis2
            .tickSize(-height)
            .tickFormat(''));

        svg.insert("g", '#scatterplot')
            .attr("class", "grid grid-y")
            .call(yAxis2
            .tickSize(-width)
            .tickFormat(''));

        svg.selectAll('.grid')
            .selectAll('line')
            .attr('stroke', 'lightgray');
        }

        function zoom() {
        const t = scatter.transition().duration(750);
        svg.select("#axis--x").transition(t).call(xAxis);
        svg.select(".grid-x")
            .transition(t)
            .call(xAxis2
                .tickSize(-height)
                .tickFormat(''))
            .selectAll('line')
            .attr('stroke', 'lightgray');

        svg.select("#axis--y").transition(t).call(yAxis);
        svg.select(".grid-y")
            .transition(t)
            .call(yAxis2
                .tickSize(-width)
                .tickFormat(''))
            .selectAll('line')
            .attr('stroke', 'lightgray');

        scatter.selectAll("circle")
            .transition(t)
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y));
        }
        });