const TOTAL_DAYS = 31;
const DETAIL_THRESHOLD = 13; 

const stageTitle = d3.select("#stage-title");
const stageInfo = d3.select("#stage-info");
const stagePhoto = d3.select("#stage-photo img");
const stagePhotoContainer = d3.select("#stage-photo");
const stageCaption = d3.select("#stage-caption");
const stageDescription = d3.select("#stage-description");
const elevationPanel = d3.select("#elevation-panel");
const dayCounter = d3.select("#day-counter");
const prevDayBtn = d3.select("#prev-day");
const nextDayBtn = d3.select("#next-day");
const youtubePanel = d3.select("#youtube-panel");
const youtubeLink = d3.select("#youtube-link");
const youtubeThumb = d3.select("#youtube-thumb");
const youtubeTitle = d3.select("#youtube-title");

const photoElement = stagePhoto.node(); 
photoElement.addEventListener('load', () => {
    stagePhoto.classed('opacity-0', false); // Fade the photo in
});

const storyPanelContainer = document.getElementById('story-panel-container');
const panelWidth = storyPanelContainer.offsetWidth;

const map = L.map('map', {
    zoomControl: false
});
L.control.zoom({ position: 'topright' }).addTo(map);

const apiKey = MAPBOX_API_KEY;
L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token=${apiKey}`, {
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 22, tileSize: 512, zoomOffset: -1
}).addTo(map);

const originalColors = d3.schemeSet1; 
const colorsToRemove = [
    originalColors[2],
    originalColors[8]
];
const customColors = originalColors.filter(color => !colorsToRemove.includes(color));
const colorScale = d3.scaleOrdinal(customColors);

const caminoFeatures = caminoMetadata
    .filter(day => day.path_simple) 
    .map(day => ({
        type: "Feature",
        properties: day,
        geometry: { type: "LineString", coordinates: [] } 
    }));

const AppState = {
    currentDay: -1,
    isAnimatingFlyTo: false,
    panelUpdateTimeoutId: null,
    hoverMarker: null,
    hideIndicatorsTimeout: null,
    activeChart: {
        xScale: null,
        yScale: null,
        indicator: null,
        width: 0,
        height: 0
    }
};

let poiMarkers = new L.MarkerClusterGroup({
    maxClusterRadius: 40, 
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 16,
    
    iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount();
        const childMarkers = cluster.getAllChildMarkers();

        // Find the day of the first marker in the cluster to determine the color
        const firstPoiData = childMarkers[0].options.poi;
        const dayColor = colorScale(firstPoiData.day);

        // Determine if the background color is light or dark
        const lightness = d3.lab(dayColor).l;
        const textColor = lightness > 70 ? 'black' : 'white';

        // Embed both the background and text color in the HTML
        const innerHtml = `<div style="background-color: ${dayColor}; color: ${textColor};"><span>${count}</span></div>`;

        return L.divIcon({
            html: innerHtml,
            className: 'marker-cluster',
            iconSize: new L.Point(40, 40)
        });
    }
});

map.addLayer(poiMarkers);

const pathDataCache = {};

function getWeights() {
    const currentZoom = map.getZoom();
    let baseWeight = 3;
    let activeWeight = 5;
    if (currentZoom > 13) { baseWeight = 2.5; activeWeight = 4.5; }
    if (currentZoom > 15) { baseWeight = 2; activeWeight = 4; }
    return { baseWeight, activeWeight };
}

function createPoiIcon(color) {
    const iconHtml = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36px" height="36px">
            <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
        </svg>`;

    return L.divIcon({
        html: iconHtml,
        className: '', 
        iconSize: [36, 36],
        iconAnchor: [12, 24], 
        popupAnchor: [0, -24]
    });
}

function stylePath(feature) {
    const day = feature.properties.day;
    const isActive = day === AppState.currentDay;
    const { baseWeight, activeWeight } = getWeights();
    return {
        color: isActive ? d3.color(colorScale(day)).brighter(0.5) : colorScale(day),
        weight: isActive ? activeWeight : baseWeight,
        opacity: 0.9
    };
}

function styleCasing(feature) {
    const isActive = feature.properties.day === AppState.currentDay;
    const { baseWeight, activeWeight } = getWeights();
    return {
        color: '#FFFFFF',
        weight: isActive ? activeWeight + 2 : baseWeight + 2,
        opacity: 0.7
    };
}

function onEachFeature(feature, layer) {
    layer.on('click', function (e) {
        updateStory(feature.properties.day);
    });

    const dayNumber = feature.properties.day;

    layer.on('mouseover', () => showIndicators(dayNumber));
    layer.on('mouseout', () => hideIndicators());
    layer.on('mousemove', function(e) {
        // Ensure we have data for the current day
        if (!pathDataCache[AppState.currentDay]) return;

        const pathData = pathDataCache[AppState.currentDay];
        let minDistance = Infinity;
        let closestIndex = -1;

        // Loop through all points in the day's full-resolution path
        // to find the one closest to the mouse cursor.
        pathData.path_full.forEach((point, index) => {
            // Create a Leaflet LatLng object for the point
            const latLng = L.latLng(point[1], point[0]);
            
            // Calculate the distance from the mouse to this point
            const distance = e.latlng.distanceTo(latLng);

            // If this point is the closest one found so far, record it
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        // Update the indicators with the index of the closest point
        updateIndicators(closestIndex, dayNumber);
    });
}

function showPoiInPanel(poi) {
    clearTimeout(AppState.panelUpdateTimeoutId);
    const storyContent = d3.select("#story-content");
    storyContent.classed('content-fading', true);

    AppState.panelUpdateTimeoutId = setTimeout(() => {
        stageTitle.text(poi.title);
        stageInfo.text('');
        stagePhoto.classed('opacity-0', true);
        stagePhoto.attr("src", poi.photoUrl);
        stageCaption.text(poi.photoCaption || '');
        stageDescription.text(poi.description);
        storyContent.classed('content-fading', false);
    }, 200);
}

function drawPoisForDay(dayNumber) {
    poiMarkers.clearLayers();
    const poisForDay = poiData.filter(poi => poi.day === dayNumber);

    poisForDay.forEach(poi => {
        const dayColor = colorScale(poi.day);
        const customIcon = createPoiIcon(dayColor); 
        
        const marker = L.marker(poi.coordinates, { 
            icon: customIcon,
            poi: poi
        });

        marker.on('mouseover', function (e) {
            showPoiInPanel(poi);

            // Find the closest point on the path to this POI
            const pathData = pathDataCache[dayNumber];
            if (!pathData || !pathData.path_full) return;

            let minDistance = Infinity;
            let closestIndex = -1;
            const poiLatLng = L.latLng(poi.coordinates[0], poi.coordinates[1]);

            pathData.path_full.forEach((point, index) => {
                const pathLatLng = L.latLng(point[1], point[0]);
                const distance = poiLatLng.distanceTo(pathLatLng);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            // Show and update the indicators at that closest point
            if (closestIndex !== -1) {
                showIndicators(dayNumber);
                updateIndicators(closestIndex, dayNumber);
            }
        });

        marker.on('mouseout', function (e) {
            restoreDayInPanel(AppState.currentDay);
            hideIndicators();
        });

        poiMarkers.addLayer(marker);
    });
}

async function getPathData(dayNumber) {
    if (pathDataCache[dayNumber]) {
        return pathDataCache[dayNumber];
    }
    const path = `data/day_${String(dayNumber).padStart(2, '0')}.json`;
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Path file not found');
        const data = await response.json();
        pathDataCache[dayNumber] = data; 
        return data;
    } catch (error) {
        console.error(`Could not load path data for day ${dayNumber}:`, error);
        return null;
    }
}

casingLayer = L.geoJSON(null, { style: styleCasing, onEachFeature: onEachFeature }).addTo(map);
colorLayer = L.geoJSON(null, { style: stylePath, onEachFeature: onEachFeature }).addTo(map);

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

function drawElevationProfile(dayNumber) {
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

function setInitialStoryPanel() {
    AppState.currentDay = -1;
    poiMarkers.clearLayers();
    elevationPanel.classed("hidden", true);
    youtubePanel.classed("hidden", true);
    stageTitle.text("My Camino Francés");
    stageInfo.text("An 800km journey across Spain");
    stagePhoto.attr("src", "https://github.com/sophiefsadler/Camino_Map/blob/main/images/story_panel/Overview.jpg?raw=true");
    stagePhotoContainer.classed('h-64', true).classed('h-48', false);
    stageDescription.text("Hi! I'm Sophie, and in March & April 2024 I walked the Camino Francés from Saint-Jean-Pied-de-Port to Santiago de Compostela. This is the story of my 31-day walk across northern Spain. Click 'Next' to begin the journey.");
    dayCounter.classed("hidden", false);
    dayCounter.text(`Day 0 / ${TOTAL_DAYS}`);
    prevDayBtn.property("disabled", true);
    nextDayBtn.property("disabled", false);
    casingLayer.setStyle(styleCasing);
    colorLayer.setStyle(stylePath);
}

function updatePanelContent(dayData) {
    // Set title format based on current day
    if (dayData.day === 12.5 || dayData.day === 32) {
        stageTitle.text(`${dayData.start} ${dayData.end}`);
    } else if (dayData.day === 0) {
        stageTitle.text(`Day ${dayData.day}: ${dayData.start} ${dayData.end}`);
    } else {
        stageTitle.text(`Day ${dayData.day}: ${dayData.start} to ${dayData.end}`);
    }

    // Set the panel content
    stageInfo.text(dayData.distance > 0 ? `Distance: ${dayData.distance} km` : '');
    stagePhoto.classed('opacity-0', true);
    stagePhoto.attr("src", dayData.photo);
    stageCaption.text(dayData.photoCaption ? dayData.photoCaption : '');

    // Fetch and render the diary file
    if (dayData.diaryFile) {
        stageDescription.text("Loading diary...");
        fetch(dayData.diaryFile)
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(text => { stageDescription.html(marked.parse(text)); })
            .catch(error => {
                console.error('Error fetching diary file:', error);
                stageDescription.text("Could not load diary entry for this day.");
            });
    } else {
        stageDescription.text(dayData.description);
    }
}

function updateUIVisibility(dayData) {
    // Show or hide the day counter
    if (dayData.day === 12.5 || dayData.day === 32) {
        dayCounter.classed("hidden", true);
    } else {
        dayCounter.classed("hidden", false);
        dayCounter.text(`Day ${AppState.currentDay} / ${TOTAL_DAYS}`);
    }

    // Show or hide the YouTube panel
    if (dayData.youtube && dayData.youtube.videoId) {
        const videoUrl = `https://www.youtube.com/watch?v=${dayData.youtube.videoId}`;
        const thumbUrl = `https://i.ytimg.com/vi/${dayData.youtube.videoId}/hqdefault.jpg`;

        youtubeLink.attr("href", videoUrl);
        youtubeThumb.attr("src", thumbUrl);
        youtubeTitle.text(dayData.youtube.title);

        youtubePanel.classed("hidden", false);
    } else {
        youtubePanel.classed("hidden", true);
    }
}

function updateButtonStates(dayNumber) {
    const currentIndex = caminoMetadata.findIndex(d => d.day === dayNumber);
    prevDayBtn.property("disabled", currentIndex <= 0);
    nextDayBtn.property("disabled", currentIndex >= caminoMetadata.length - 1);
}

function updateStory(dayNumber) {
    // Update the application's current state
    AppState.currentDay = dayNumber;
    const dayData = caminoMetadata.find(d => d.day === dayNumber);
    if (!dayData) return;

    updatePanelContent(dayData);
    updateUIVisibility(dayData);
    updateButtonStates(dayNumber);

    zoomToDay(dayData);
}

function restoreDayInPanel(dayNumber) {
    clearTimeout(AppState.panelUpdateTimeoutId);
    const storyContent = d3.select("#story-content");
    const dayData = caminoMetadata.find(d => d.day === dayNumber);

    if (!dayData) {
        setInitialStoryPanel();
        return;
    }
    
    storyContent.classed('content-fading', true);

    AppState.panelUpdateTimeoutId = setTimeout(() => { 
        updatePanelContent(dayData);
        storyContent.classed('content-fading', false);
    }, 200);
}

map.on('zoomstart', function() {
    poiMarkers.clearLayers();

    if (AppState.currentDay >= 0) { 
        AppState.isAnimatingFlyTo = true;
        casingLayer.setStyle({ opacity: 0 });
        colorLayer.setStyle({ opacity: 0 });
    }
    
});

map.on('zoomend', function() {
    const currentZoom = map.getZoom();
    
    const updateLayerCoords = (layer) => {
        const day = layer.feature.properties.day;
        const pathData = pathDataCache[day];
        if (!pathData) return;

        const newCoords = currentZoom > DETAIL_THRESHOLD ? 
            pathData.path_full : 
            pathData.path_simple;
        
        if (layer.getLatLngs().length !== newCoords.length) {
            layer.setLatLngs(L.GeoJSON.coordsToLatLngs(newCoords));
        }
    };

    casingLayer.eachLayer(updateLayerCoords);
    colorLayer.eachLayer(updateLayerCoords);

    if (AppState.currentDay >= 0) {
        casingLayer.setStyle(styleCasing);
        colorLayer.setStyle(stylePath);
    }

    drawPoisForDay(AppState.currentDay);
    AppState.isAnimatingFlyTo = false;
});

map.on('zoom', function() {
    if (AppState.isAnimatingFlyTo || AppState.currentDay === 0) return;
    casingLayer.setStyle(styleCasing);
    colorLayer.setStyle(stylePath);
});

async function zoomToDay(dayData) {
    const storyPanelContainer = document.getElementById('story-panel-container');
    const panelWidth = storyPanelContainer.offsetWidth;

    if (dayData.center_coord) {
        elevationPanel.classed("hidden", true);
        return map.flyTo(dayData.center_coord, dayData.zoom_level, { duration: 1.5 });
    }
    
    const pathData = await getPathData(dayData.day);

    if (pathData && pathData.elevation_data && pathData.elevation_data.length > 0) {
        if (dayData.day === 18) {
            elevationPanel.classed("top-6", false).classed("bottom-6", true);
        } else {
            elevationPanel.classed("bottom-6", false).classed("top-6", true);
        }

        elevationPanel.classed("hidden", false);
        drawElevationProfile(dayData.day);
    } else {
        elevationPanel.classed("hidden", true);
    }

    if (!pathData) return;

    const geoJsonLayerForZoom = L.geoJSON({ type: "LineString", coordinates: pathData.path_simple });
    map.flyToBounds(geoJsonLayerForZoom.getBounds(), { 
        paddingTopLeft: L.point(panelWidth + 50, 50),
        paddingBottomRight: L.point(50, 50),
        duration: 0.75 
    });
}

async function fetchAllPathData() {
    const walkingDaysMetadata = caminoMetadata.filter(d => !d.center_coord);
    const promises = walkingDaysMetadata.map(d => getPathData(d.day));
    const allPaths = await Promise.all(promises);

    const features = walkingDaysMetadata.map((dayMeta, i) => {
        const pathData = allPaths[i];
        if (!pathData || !pathData.path_simple) return null;
        
        return {
            type: "Feature",
            properties: dayMeta,
            geometry: { type: "LineString", coordinates: pathData.path_simple }
        };
    }).filter(feature => feature !== null);

    return features;
}

function initializeMapLayers(features) {
    casingLayer.addData(features);
    colorLayer.addData(features);

    const fullBounds = colorLayer.getBounds();
    if (fullBounds.isValid()) {
        const panelWidth = document.getElementById('story-panel-container').offsetWidth;
        map.fitBounds(fullBounds, { 
            paddingTopLeft: L.point(panelWidth + 20, 20),
            paddingBottomRight: L.point(20, 20)
        });
    }
}

async function setInitialView() {
    const features = await fetchAllPathData();
    if (features) {
        initializeMapLayers(features);
    }

    setInitialStoryPanel();
}

function showIndicators(dayNumber) {
    // Cancel any pending timeout to hide the indicators
    clearTimeout(AppState.hideIndicatorsTimeout);

    const dayColor = colorScale(dayNumber);

    // Create or update and show the map marker
    if (!AppState.hoverMarker) {
        AppState.hoverMarker = L.circleMarker([0, 0], {
            radius: 8,
            color: '#ffffff',
            weight: 2,
            fillOpacity: 1,
        });
    }
    AppState.hoverMarker.setStyle({ fillColor: dayColor }).addTo(map);

    // Show the chart indicator
    if (AppState.activeChart.indicator) {
        AppState.activeChart.indicator.style("display", null);
    }
}

function hideIndicators() {
    AppState.hideIndicatorsTimeout = setTimeout(() => {
        if (AppState.hoverMarker) AppState.hoverMarker.remove();
        if (AppState.activeChart.indicator) AppState.activeChart.indicator.style("display", "none");
    }, 50); // A 50ms delay prevents flickering
}

function updateIndicators(index, dayNumber) {
    if (index === -1 || !pathDataCache[dayNumber]) return;

    const pathData = pathDataCache[dayNumber];
    const geoPoint = pathData.path_full[index];
    const elevationPoint = pathData.elevation_data[index];

    // Update map marker
    if (AppState.hoverMarker) {
        AppState.hoverMarker.setLatLng([geoPoint[1], geoPoint[0]]);
    }

    // Update chart indicator
    if (AppState.activeChart.xScale && AppState.activeChart.yScale && AppState.activeChart.indicator) {
        const distance = elevationPoint[0];
        const elevation = elevationPoint[1];
        AppState.activeChart.indicator.select(".indicator-line")
            .attr("x1", AppState.activeChart.xScale(distance))
            .attr("x2", AppState.activeChart.xScale(distance));
        AppState.activeChart.indicator.select(".indicator-circle")
            .attr("cx", AppState.activeChart.xScale(distance))
            .attr("cy", AppState.activeChart.yScale(elevation));
    }
}

prevDayBtn.on("click", () => {
    const currentIndex = caminoMetadata.findIndex(d => d.day === AppState.currentDay);
    if (currentIndex > 0) {
        const prevDayData = caminoMetadata[currentIndex - 1];
        updateStory(prevDayData.day);
    }
});

nextDayBtn.on("click", () => {
    if (AppState.currentDay === -1) {
        updateStory(caminoMetadata[0].day);
        return;
    }
    
    const currentIndex = caminoMetadata.findIndex(d => d.day === AppState.currentDay);
    if (currentIndex > -1 && currentIndex < caminoMetadata.length - 1) {
        const nextDayData = caminoMetadata[currentIndex + 1];
        updateStory(nextDayData.day);
    }
});

setInitialView();