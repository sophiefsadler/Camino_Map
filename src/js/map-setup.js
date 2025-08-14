// ==========================================================================
// IMPORTS
// ==========================================================================

import { AppState, pathDataCache } from './state.js';
import { 
    MAPBOX_API_KEY, 
    colorScale, 
    DETAIL_THRESHOLD } from './config.js';
import {
    showPoiInPanel, 
    restoreDayInPanel, 
    showIndicators, 
    hideIndicators, 
    updateIndicators,
    elevationPanel 
} from './ui-logic.js';
import { drawElevationProfile } from './chart.js';
import { getPathData } from './data.js';
import { poiData } from './poi-data.js';
import { updateStory } from './main.js';

// ==========================================================================
// CONFIGS
// ==========================================================================

const pathStyles = {
    weightTiers: [
        { zoom: 0,  base: 3,   active: 5 },
        { zoom: 13, base: 2.5, active: 4.5 },
        { zoom: 15, base: 2,   active: 4 }
    ],
    casingOffset: 2
};

const markerClusterOptions = {
    maxClusterRadius: 40,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 16
};

// ==========================================================================
// MODULE-LEVEL VARIABLES & MAP INITIALIZATION
// ==========================================================================

export const map = L.map('map', {
    zoomControl: false
});
L.control.zoom({ position: 'topright' }).addTo(map);

L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`, {
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 22, tileSize: 512, zoomOffset: -1
}).addTo(map);

export const poiMarkers = new L.MarkerClusterGroup({
    ...markerClusterOptions,
    
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

// Initialize layers but leave them empty for now.
export const casingLayer = L.geoJSON(null, { style: styleCasing, onEachFeature: onEachFeature }).addTo(map);
export const colorLayer = L.geoJSON(null, { style: stylePath, onEachFeature: onEachFeature }).addTo(map);

// ==========================================================================
// "PRIVATE" HELPER FUNCTIONS
// ==========================================================================

function getWeights() {
    const currentZoom = map.getZoom();
    let chosenTier = pathStyles.weightTiers[0];

    for (const tier of pathStyles.weightTiers) {
        if (currentZoom > tier.zoom) {
            chosenTier = tier;
        }
    }

    return {
        baseWeight: chosenTier.base,
        activeWeight: chosenTier.active
    };
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

function onEachFeature(feature, layer) {
    layer.on('click', function (e) {
        updateStory(feature.properties.day);
    });

    const dayNumber = feature.properties.day;

    layer.on('mouseover', () => {
        // Only show indicators if hovering over the currently selected day
        if (dayNumber !== AppState.currentDay) return;
        showIndicators(dayNumber);
    });

    layer.on('mouseout', () => hideIndicators());

    layer.on('mousemove', function(e) {
        // Only update indicators for the currently selected day
        if (dayNumber !== AppState.currentDay) return;

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

function flyToCenteredView(dayData) {
    elevationPanel.classed("hidden", true);
    map.flyTo(dayData.center_coord, dayData.zoom_level, { duration: 1.5 });
}

async function flyToPathView(dayData) {
    const pathData = await getPathData(dayData.day);
    
    // Manage elevation panel visibility and position
    if (pathData && pathData.elevation_data && pathData.elevation_data.length > 0) {
        if (dayData.day === 18 || dayData.day === 24) {
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

    // Fly to the path's bounds
    const geoJsonLayerForZoom = L.geoJSON({ type: "LineString", coordinates: pathData.path_simple });
    const panelWidth = document.getElementById('story-panel-container').offsetWidth;
    map.flyToBounds(geoJsonLayerForZoom.getBounds(), { 
        paddingTopLeft: L.point(panelWidth + 50, 50),
        paddingBottomRight: L.point(50, 50),
        duration: 0.75 
    });
}

// ==========================================================================
// "PUBLIC" EXPORTED FUNCTIONS
// ==========================================================================

export function stylePath(feature) {
    const day = feature.properties.day;
    const isActive = day === AppState.currentDay;
    const { baseWeight, activeWeight } = getWeights();
    return {
        color: isActive ? d3.color(colorScale(day)).brighter(0.5) : colorScale(day),
        weight: isActive ? activeWeight : baseWeight,
        opacity: 0.9
    };
}

export function styleCasing(feature) {
    const isActive = feature.properties.day === AppState.currentDay;
    const { baseWeight, activeWeight } = getWeights();
    return {
        color: '#FFFFFF',
        weight: isActive ? activeWeight + 2 : baseWeight + 2,
        opacity: 0.7
    };
}

export function initializeMapLayers(features) {
    const panelWidth = document.getElementById('story-panel-container').offsetWidth;
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

export function zoomToDay(dayData) {
    if (dayData.center_coord) {
        flyToCenteredView(dayData);
    } else {
        flyToPathView(dayData);
    }
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

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