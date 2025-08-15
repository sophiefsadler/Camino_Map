// ==========================================================================
// IMPORTS
// ==========================================================================

import { AppState, pathDataCache } from './state.js';
import { TOTAL_DAYS, colorScale } from './config.js';
import { caminoMetadata } from './camino-metadata.js';
import {
    map,
    poiMarkers,
    casingLayer,
    colorLayer,
    styleCasing,
    stylePath,
} from './map-setup.js';
import { updateStory } from './main.js';

// ==========================================================================
// CONFIGS
// ==========================================================================

const UITimings = {
    panelFade: 200, // ms
    indicatorHideDelay: 50 // ms
};

const hoverMarkerOptions = {
    radius: 8,
    color: '#ffffff',
    weight: 2,
    fillOpacity: 1
};

const timelineLabels = {
    0: "SJPDP",
    12.5: "Madrid",
    32: "Santiago"
};

// ==========================================================================
// DOM ELEMENT SELECTORS
// ==========================================================================

export const stageTitle = d3.select("#stage-title");
export const stageInfo = d3.select("#stage-info");
export const stagePhoto = d3.select("#stage-photo img");
export const stagePhotoContainer = d3.select("#stage-photo");
export const stageCaption = d3.select("#stage-caption");
export const stageDescription = d3.select("#stage-description");
export const elevationPanel = d3.select("#elevation-panel");
export const dayCounter = d3.select("#day-counter");
export const prevDayBtn = d3.select("#prev-day");
export const nextDayBtn = d3.select("#next-day");
export const youtubePanel = d3.select("#youtube-panel");
export const youtubeLink = d3.select("#youtube-link");
export const youtubeThumb = d3.select("#youtube-thumb");
export const youtubeTitle = d3.select("#youtube-title");

// ==========================================================================
// EXPORTED UI FUNCTIONS
// ==========================================================================

export function setInitialStoryPanel() {
    AppState.currentDay = -1;
    poiMarkers.clearLayers();
    elevationPanel.classed("hidden", true);
    youtubePanel.classed("hidden", true);
    stageTitle.text("My Camino Francés");
    stageInfo.text("An 800km journey across Spain");
    stagePhoto.attr("src", "https://github.com/sophiefsadler/Camino_Map/blob/main/assets/images/story_panel/Overview.jpg?raw=true");
    stagePhotoContainer.classed('h-64', true).classed('h-48', false);
    stageDescription.text("Hi! I'm Sophie, and in March & April 2024 I walked the Camino Francés from Saint-Jean-Pied-de-Port to Santiago de Compostela. This is the story of my 31-day walk across northern Spain. Click 'Next' to begin the journey.");
    dayCounter.classed("hidden", false);
    dayCounter.text(`Day 0 / ${TOTAL_DAYS}`);
    prevDayBtn.property("disabled", true);
    nextDayBtn.property("disabled", false);
    casingLayer.setStyle(styleCasing);
    colorLayer.setStyle(stylePath);
}

export function updatePanelContent(dayData) {
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

export function updateUIVisibility(dayData) {
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

export function updateButtonStates(dayNumber) {
    const currentIndex = caminoMetadata.findIndex(d => d.day === dayNumber);
    prevDayBtn.property("disabled", currentIndex <= 0);
    nextDayBtn.property("disabled", currentIndex >= caminoMetadata.length - 1);
}

export function restoreDayInPanel(dayNumber) {
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
    }, UITimings.panelFade);
}

export function showPoiInPanel(poi) {
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
    }, UITimings.panelFade);
}

export function showIndicators(dayNumber) {
    // Cancel any pending timeout to hide the indicators
    clearTimeout(AppState.hideIndicatorsTimeout);

    const dayColor = colorScale(dayNumber);

    // Create or update and show the map marker
    if (!AppState.hoverMarker) {
            AppState.hoverMarker = L.circleMarker([0, 0], hoverMarkerOptions);
    }
    AppState.hoverMarker.setStyle({ fillColor: dayColor }).addTo(map);

    // Show the chart indicator
    if (AppState.activeChart.indicator) {
        AppState.activeChart.indicator.style("display", null);
    }
}

export function hideIndicators() {
    AppState.hideIndicatorsTimeout = setTimeout(() => {
        if (AppState.hoverMarker) AppState.hoverMarker.remove();
        if (AppState.activeChart.indicator) AppState.activeChart.indicator.style("display", "none");
    }, UITimings.indicatorHideDelay); // A 50ms delay prevents flickering
}

export function updateIndicators(index, dayNumber) {
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

export function createTimeline() {
    const timeline = d3.select("#timeline");

    // Clear any existing buttons
    timeline.html("");

    // Create a button for each day in the metadata
    caminoMetadata.forEach(day => {
        // Get the original color from the scale
        const hslColor = d3.hsl(colorScale(String(day.day)));

        // Now, modify the saturation and lightness to make a pastel
        hslColor.s = 0.9;
        hslColor.l = 0.77;

        const button = timeline.append("button")
            .attr("class", "timeline-btn")
            .attr("data-day", day.day)
            .style("background-color", hslColor)
            .on("click", () => updateStory(day.day));

        button.text(timelineLabels[day.day] || `Day ${day.day}`);
    });
}

export function updateActiveButton(dayNumber) {
    const buttons = d3.selectAll(".timeline-btn");

    // Reset all buttons to their inactive, pastel state
    buttons.each(function() {
        const button = d3.select(this);
        const day = button.attr("data-day");

        // Remove the 'active' class
        button.classed("active", false);

        // Recalculate and apply the pastel color
        const hslColor = d3.hsl(colorScale(day));
        hslColor.s = 0.6; // Saturation
        hslColor.l = 0.75; // Lightness
        button.style("background-color", hslColor);
    });

    // Find the specific button that is now active
    const activeButton = d3.select(`.timeline-btn[data-day='${dayNumber}']`);

    if (!activeButton.empty()) {
        // Add the 'active' class for the border and shadow effect
        activeButton.classed("active", true);
        activeButton.style("background-color", colorScale(String(dayNumber)));
    }
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

const photoElement = stagePhoto.node();
photoElement.addEventListener('load', () => {
    stagePhoto.classed('opacity-0', false);
});

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