// ==========================================================================
// IMPORTS
// ==========================================================================

import { AppState, pathDataCache } from './state.js';
import { colorScale } from './config.js';
import { showIndicators, hideIndicators, updateIndicators } from './ui-logic.js';

// ==========================================================================
// MAIN ORCHESTRATOR FOR ELEVATION PROFILE CHART
// ==========================================================================

export function drawElevationProfile(dayNumber) {
    const chartContainer = d3.select("#elevation-chart-container");
    const pathData = pathDataCache[dayNumber];
    if (!pathData || !pathData.elevation_data || pathData.elevation_data.length === 0) {
        return;
    }

    // Set up the canvas and dimensions
    const { svg, width, height } = setupElevationChartArea(chartContainer);
    AppState.activeChart.width = width;
    AppState.activeChart.height = height;

    // Create the scales
    const { xScale, yScale } = createElevationChartScales(pathData.elevation_data);
    AppState.activeChart.xScale = xScale;
    AppState.activeChart.yScale = yScale;

    // Draw the static parts of the chart
    drawElevationChartAxesAndGrid(svg);

    // Draw the data
    const dayColor = colorScale(dayNumber);
    drawElevationChartPaths(svg, pathData.elevation_data, dayColor);

    // Set up the mouse listeners for the interactive blobs
    setupElevationChartInteractivity(svg, dayNumber, pathData);
}

// ==========================================================================
// "PRIVATE" HELPER FUNCTIONS
// ==========================================================================

function setupElevationChartArea(chartContainer) {
    chartContainer.html("");

    const margin = { top: 10, right: 10, bottom: 25, left: 40 };
    const width = chartContainer.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = chartContainer.node().getBoundingClientRect().height - margin.top - margin.bottom;

    const svg = chartContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    return { svg, width, height };
}

function createElevationChartScales(elevationData) {
    const { width, height } = AppState.activeChart;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(elevationData, d => d[0]))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(elevationData, d => d[1]) - 50, d3.max(elevationData, d => d[1]) + 50])
        .range([height, 0]);

    return { xScale, yScale };
}

function drawElevationChartAxesAndGrid(svg) {
    const { width, height, xScale, yScale } = AppState.activeChart;

    // Grid Lines
    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yScale)
            .tickSize(-width)
            .tickFormat("")
        );
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
            .tickSize(-height)
            .tickFormat("")
        );

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(5).tickFormat(d => `${d} km`);
    const yAxis = d3.axisLeft(yScale).ticks(4).tickFormat(d => `${d} m`);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .select(".domain").remove();
    svg.append("g")
        .call(yAxis)
        .select(".domain").remove();
}

function drawElevationChartPaths(svg, elevationData, dayColor) {
    const { height, xScale, yScale } = AppState.activeChart;

    // Define the Area generator
    const area = d3.area()
        .x(d => xScale(d[0]))
        .y0(height)
        .y1(d => yScale(d[1]));

    // Draw the area
    svg.append("path")
        .datum(elevationData)
        .attr("fill", dayColor)
        .attr("fill-opacity", 0.4)
        .attr("d", area);
    
    // Draw the top line of the area
    svg.append("path")
        .datum(elevationData)
        .attr("fill", "none")
        .attr("stroke", dayColor)
        .attr("stroke-width", 2)
        .attr("d", d3.line().x(d => xScale(d[0])).y(d => yScale(d[1])));
}

function setupElevationChartInteractivity(svg, dayNumber, pathData) {
    const { width, height, xScale } = AppState.activeChart;
    const dayColor = colorScale(dayNumber);

    // Create the indicator elements and store them in the AppState
    const chartIndicatorGroup = svg.append("g")
        .attr("class", "chart-indicator")
        .style("display", "none");
    AppState.activeChart.indicator = chartIndicatorGroup;

    chartIndicatorGroup.append("line")
        .attr("class", "indicator-line")
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", dayColor);

    chartIndicatorGroup.append("circle")
        .attr("class", "indicator-circle")
        .attr("r", 5)
        .attr("fill", dayColor);

    // Set up the mouse listener overlay
    const bisectDistance = d3.bisector(d => d[0]).left;

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => showIndicators(dayNumber))
        .on("mouseout", () => hideIndicators())
        .on("mousemove", function(event) {
            const mouseX = d3.pointer(event)[0];
            const distance = xScale.invert(mouseX);
            const index = bisectDistance(pathData.elevation_data, distance, 1);
            const d0 = pathData.elevation_data[index - 1];
            const d1 = pathData.elevation_data[index];
            let pointIndex = d1 && (distance - d0[0] > d1[0] - distance) ? index : index - 1;
            updateIndicators(pointIndex, dayNumber);
        });
}