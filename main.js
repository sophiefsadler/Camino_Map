const TOTAL_DAYS = 31;
const DETAIL_THRESHOLD = 13; 

const stageTitle = d3.select("#stage-title");
const stageInfo = d3.select("#stage-info");
const stagePhoto = d3.select("#stage-photo img");
const stagePhotoContainer = d3.select("#stage-photo");
const stageCaption = d3.select("#stage-caption");
const stageDescription = d3.select("#stage-description");
const dayCounter = d3.select("#day-counter");
const prevDayBtn = d3.select("#prev-day");
const nextDayBtn = d3.select("#next-day");

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

let currentDay = -1;
let casingLayer, colorLayer;
let isAnimatingFlyTo = false;
let panelUpdateTimeoutId = null;

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
    const isActive = day === currentDay;
    const { baseWeight, activeWeight } = getWeights();
    return {
        color: isActive ? d3.color(colorScale(day)).brighter(0.5) : colorScale(day),
        weight: isActive ? activeWeight : baseWeight,
        opacity: 0.9
    };
}

function styleCasing(feature) {
    const isActive = feature.properties.day === currentDay;
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
}

function showPoiInPanel(poi) {
    clearTimeout(panelUpdateTimeoutId);
    const storyContent = d3.select("#story-content");
    storyContent.classed('content-fading', true);

    panelUpdateTimeoutId = setTimeout(() => {
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

        // When hovering over a marker, show its details in the panel.
        marker.on('mouseover', function (e) {
            showPoiInPanel(poi);
        });

        // When the mouse leaves, restore the panel to the current day's details.
        marker.on('mouseout', function (e) {
            restoreDayInPanel(currentDay);
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

function setInitialStoryPanel() {
    currentDay = -1;
    poiMarkers.clearLayers();
    stageTitle.text("My Camino Francés");
    stageInfo.text("An 800km journey across Spain");
    stagePhoto.attr("src", "https://github.com/sophiefsadler/Camino_Map/blob/main/images/story_panel/Overview.jpg?raw=true");
    stagePhotoContainer.classed('h-64', true).classed('h-48', false);
    stageDescription.text("Hi! I'm Sophie, and in March & April 2024 I walked the Camino Francés from Saint-Jean-Pied-de-Port to Santiago de Compostela. This is the story of my 31-day walk across northern Spain. Click 'Next' to begin the journey.");
    dayCounter.text(`Day 0 / ${TOTAL_DAYS}`);
    prevDayBtn.property("disabled", true);
    nextDayBtn.property("disabled", false);
    casingLayer.setStyle(styleCasing);
    colorLayer.setStyle(stylePath);
}

function updateStory(dayNumber) {
    currentDay = dayNumber;
    const dayData = caminoMetadata.find(d => d.day === dayNumber);
    if (!dayData) return;

    if (dayData.day === 0) {
        stageTitle.text(`Day ${dayData.day}: ${dayData.start} ${dayData.end}`);
    } else {
        stageTitle.text(`Day ${dayData.day}: ${dayData.start} to ${dayData.end}`);
    }

    stageInfo.text(dayData.distance > 0 ? `Distance: ${dayData.distance} km` : '');
    stagePhoto.classed('opacity-0', true);
    stagePhoto.attr("src", dayData.photo);
    stageCaption.text(dayData.photoCaption ? dayData.photoCaption : '');
    
    dayCounter.text(`Day ${currentDay} / ${TOTAL_DAYS}`);
    
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
    
    if (dayNumber === 0) {
        casingLayer.setStyle({ opacity: 0 });
        colorLayer.setStyle({ opacity: 0 });
    } else {
        casingLayer.setStyle(styleCasing);
        colorLayer.setStyle(stylePath);
    }

    prevDayBtn.property("disabled", currentDay <= 0); 
    nextDayBtn.property("disabled", currentDay >= TOTAL_DAYS || !caminoMetadata.find(d => d.day === currentDay + 1));

    zoomToDay(dayData);
}

function restoreDayInPanel(dayNumber) {
    clearTimeout(panelUpdateTimeoutId);
    const storyContent = d3.select("#story-content");
    const dayData = caminoMetadata.find(d => d.day === dayNumber);

    if (!dayData) {
        setInitialStoryPanel();
        return;
    }
    
    storyContent.classed('content-fading', true);

    panelUpdateTimeoutId = setTimeout(() => { 
        if (dayData.day === 0) {
            stageTitle.text(`Day ${dayData.day}: ${dayData.start} ${dayData.end}`);
        } else {
            stageTitle.text(`Day ${dayData.day}: ${dayData.start} to ${dayData.end}`);
        }
        stageInfo.text(dayData.distance > 0 ? `Distance: ${dayData.distance} km` : '');
        stagePhoto.classed('opacity-0', true);
        stagePhoto.attr("src", dayData.photo);
        stageCaption.text(dayData.photoCaption || '');

        if (dayData.diaryFile) {
            fetch(dayData.diaryFile)
                .then(response => response.ok ? response.text() : Promise.reject('File not found'))
                .then(text => { stageDescription.html(marked.parse(text)); })
                .catch(error => { stageDescription.text("Could not load diary entry."); });
        } else {
            stageDescription.text(dayData.description);
        }

        storyContent.classed('content-fading', false);
    }, 200);
}

map.on('zoomstart', function() {
    poiMarkers.clearLayers();

    if (currentDay > 0) { 
        isAnimatingFlyTo = true;
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

    if (currentDay > 0) {
        casingLayer.setStyle(styleCasing);
        colorLayer.setStyle(stylePath);
    }

    drawPoisForDay(currentDay);
    isAnimatingFlyTo = false;
});

map.on('zoom', function() {
    if (isAnimatingFlyTo || currentDay === 0) return;
    casingLayer.setStyle(styleCasing);
    colorLayer.setStyle(stylePath);
});

async function zoomToDay(dayData) {
    const storyPanelContainer = document.getElementById('story-panel-container');
    const panelWidth = storyPanelContainer.offsetWidth;

    if (dayData.center_coord) {
        return map.flyTo(dayData.center_coord, dayData.zoom_level, { duration: 1.5 });
    }
    
    const pathData = await getPathData(dayData.day);
    if (!pathData) return;

    const geoJsonLayerForZoom = L.geoJSON({ type: "LineString", coordinates: pathData.path_simple });
    map.flyToBounds(geoJsonLayerForZoom.getBounds(), { 
        paddingTopLeft: L.point(panelWidth + 50, 50),
        paddingBottomRight: L.point(50, 50),
        duration: 0.75 
    });
}

function setInitialView() {
    const storyPanelContainer = document.getElementById('story-panel-container');
    const panelWidth = storyPanelContainer.offsetWidth;
    
    const walkingDaysMetadata = caminoMetadata.filter(d => d.day > 0);
    const promises = walkingDaysMetadata.map(d => getPathData(d.day));

    Promise.all(promises).then(allPaths => {
        const features = walkingDaysMetadata.map((dayMeta, i) => {
            return {
                type: "Feature",
                properties: dayMeta,
                geometry: { type: "LineString", coordinates: allPaths[i].path_simple }
            };
        });
        
        casingLayer.addData(features);
        colorLayer.addData(features);

        const fullBounds = colorLayer.getBounds();
        if (fullBounds.isValid()) {
            map.fitBounds(fullBounds, { 
                paddingTopLeft: L.point(panelWidth + 20, 20),
                paddingBottomRight: L.point(20, 20)
            });
        }
    });
    
    setInitialStoryPanel();
}

prevDayBtn.on("click", () => {
    if (currentDay === 0) {
        setInitialView();
    } else if (currentDay > 0) { 
        updateStory(currentDay - 1);
    }
});

nextDayBtn.on("click", () => {
    if (currentDay < TOTAL_DAYS) {
            updateStory(currentDay + 1);
    }
});

setInitialView();