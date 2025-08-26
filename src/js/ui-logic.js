// ==========================================================================
// MOBILE COMPATIBILITY
// ==========================================================================

export function isMobile() {
    return window.innerWidth <= 768;
}

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
import { drawElevationProfile } from './chart.js';

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
export const dayCounter = d3.selectAll(".day-counter");
export const prevDayBtn = d3.selectAll(".prev-day-btn");
export const nextDayBtn = d3.selectAll(".next-day-btn");
export const youtubePanel = d3.select("#youtube-panel");
export const youtubeLink = d3.select("#youtube-link");
export const youtubeThumb = d3.select("#youtube-thumb");
export const youtubeTitle = d3.select("#youtube-title");

// ==========================================================================
// "PRIVATE" HELPER FUNCTIONS (for mobile UI)
// ==========================================================================

function closeAllMobilePanels() {
    if (!isMobile()) return;
    
    // Close all panels
    d3.select("#story-panel-container").classed("is-open", false);
    d3.select("#elevation-panel").classed("is-open", false);
    d3.select("#youtube-panel").classed("is-open", false);

    // Reset tab visibility
    const tabsContainer = d3.select("#mobile-tabs-container");
    tabsContainer.classed("hide-story", false).classed("hide-elevation", false);

    // After closing, immediately re-run the logic to see which tabs should be visible for the current day
    const dayData = caminoMetadata.find(d => d.day === AppState.currentDay) || caminoMetadata[0];
    updateUIVisibility(dayData);

    // Clean up the map listener
    map.off('click', closeAllMobilePanels);
}

// ==========================================================================
// EXPORTED UI FUNCTIONS
// ==========================================================================

export function setInitialStoryPanel() {
    AppState.currentDay = -1;
    poiMarkers.clearLayers();
    elevationPanel.classed("hidden", true);
    youtubePanel.classed("is-visible", false);
    if(isMobile()) {
        d3.select("#mobile-tabs-container").classed("hide-elevation", true);
    }
    stageTitle.text("My Camino Francés");
    stageInfo.text("An 800km journey across Spain");
    stagePhoto.attr("src", "https://github.com/sophiefsadler/Camino_Map/blob/main/assets/images/story_panel/Overview.jpg?raw=true");
    stagePhotoContainer.classed('h-64', true).classed('h-48', false);
    stageDescription.text("Hi! I'm Sophie, and in March & April 2024 I walked the Camino Francés from Saint-Jean-Pied-de-Port to Santiago de Compostela. This is the story of my 31-day walk across northern Spain. Click on the 'Next' button to begin the journey.");
    dayCounter.classed("hidden", false);
    dayCounter.text(`Day 0 / ${TOTAL_DAYS}`);
    prevDayBtn.property("disabled", true);
    nextDayBtn.property("disabled", false);
    casingLayer.setStyle(styleCasing);
    colorLayer.setStyle(stylePath);
    d3.select("#reset-story-btn").classed("hidden", true);
    d3.select("#reset-story-btn").on("click", unlockPoiFromPanel);
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
        const dayDisplayText = AppState.currentDay === -1 ? 0 : AppState.currentDay;
        dayCounter.text(`Day ${dayDisplayText} / ${TOTAL_DAYS}`);
    }

    // Show or hide the YouTube panel
    if (dayData.youtube && dayData.youtube.videoId) {
        const videoUrl = `https://www.youtube.com/watch?v=${dayData.youtube.videoId}`;
        const thumbUrl = `https://i.ytimg.com/vi/${dayData.youtube.videoId}/hqdefault.jpg`;

        youtubeLink.attr("href", videoUrl);
        youtubeThumb.attr("src", thumbUrl);
        youtubeTitle.text(dayData.youtube.title);

        if (!isMobile()) {
            youtubePanel.classed("is-visible", true);
        }
    } else {
        if (!isMobile()) {
            youtubePanel.classed("is-visible", false);
        }
    }

    // Show or hide the elevation tab on mobile
    if (isMobile()) {
        const elevationTab = d3.select("#elevation-tab");
        const youtubeTab = d3.select("#youtube-tab");
        if (dayData.youtube && dayData.youtube.videoId) {
            youtubeTab.style("opacity", 1).style("pointer-events", "auto");
        } else {
            youtubeTab.style("opacity", 0).style("pointer-events", "none");
        }
        const daysWithoutElevation = [-1, 0, 12.5, 32];
        if (daysWithoutElevation.includes(dayData.day)) {
            elevationTab.style("opacity", 0).style("pointer-events", "none");
        } else {
            elevationTab.style("opacity", 1).style("pointer-events", "auto");
        }
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

export function lockPoiInPanel(poi) {
    if (isMobile()) return;
    showPoiInPanel(poi);
    d3.select("#reset-story-btn").classed("hidden", false);
    prevDayBtn.property("disabled", true);
    nextDayBtn.property("disabled", true);
}

export function unlockPoiFromPanel() {
    if (isMobile()) return;
    if (AppState.currentDay === -1) return; 

    restoreDayInPanel(AppState.currentDay);
    d3.select("#reset-story-btn").classed("hidden", true);
    updateButtonStates(AppState.currentDay);
}

export function showIndicators(dayNumber) {
    // Cancel any pending timeout to hide the indicators
    clearTimeout(AppState.hideIndicatorsTimeout);

    const dayColor = colorScale(String(dayNumber));

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

    const timelineNode = timeline.node();

    // Add an event listener for scrolling
    timelineNode.addEventListener('wheel', (event) => {
        event.preventDefault();
        // Prioritize horizontal swipe (deltaX), but fall back to vertical scroll (deltaY)
        timelineNode.scrollLeft += event.deltaX || event.deltaY;
    });
    
    // Clear any existing buttons
    timeline.html("");

    // Create a button for each day in the metadata
    caminoMetadata.forEach(day => {
        // Get the original color from the scale
        const hslColor = d3.hsl(colorScale(String(day.day)));

        // Now, modify the saturation and lightness to make a pastel
        hslColor.s = 0.45;
        hslColor.l = 0.85;

        const button = timeline.append("button")
            .attr("class", "timeline-btn")
            .attr("data-day", day.day)
            .style("background-color", hslColor)
            .on("click", () => {
                if (isMobile()) {
                    closeAllMobilePanels();
                }
                updateStory(day.day);
            });

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
        hslColor.s = 0.45;
        hslColor.l = 0.85;
        button.style("background-color", hslColor);
    });

    // Find the specific button that is now active
    const activeButton = d3.select(`.timeline-btn[data-day='${dayNumber}']`);

    if (!activeButton.empty()) {
        // Add the 'active' class for the border and shadow effect
        activeButton.classed("active", true);
        activeButton.style("background-color", colorScale(String(dayNumber)));
        activeButton.node().scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
}

export function setupMobileTabs() {
    if (!isMobile()) return;

    // --- Select all mobile tabs and panels ---
    const tabsContainer = d3.select("#mobile-tabs-container");
    const storyTab = d3.select("#story-tab");
    const elevationTab = d3.select("#elevation-tab");
    const youtubeTab = d3.select("#youtube-tab");

    const storyPanel = d3.select("#story-panel-container");
    const elevationPanel = d3.select("#elevation-panel");
    const youtubePanel = d3.select("#youtube-panel");

    const storyCloseBtn = d3.select(".story-panel-close-btn");
    const elevationCloseBtn = d3.select(".elevation-panel-close-btn");
    const youtubeCloseBtn = d3.select(".youtube-panel-close-btn");

    // --- Helper to close everything and reset tabs ---
    const closeAllPanelsAndResetTabs = () => {
        storyPanel.classed("is-open", false);
        elevationPanel.classed("is-open", false);
        youtubePanel.classed("is-open", false);

        tabsContainer.classed("hide-story", false).classed("hide-elevation", false);

        const dayData = caminoMetadata.find(d => d.day === AppState.currentDay) || caminoMetadata[0];
        updateUIVisibility(dayData);

        map.off('click', closeAllPanelsAndResetTabs);
    };

    // --- Stop clicks inside panels from bubbling up ---
    L.DomEvent.on(storyPanel.node(), 'click', L.DomEvent.stopPropagation);
    L.DomEvent.on(elevationPanel.node(), 'click', L.DomEvent.stopPropagation);
    L.DomEvent.on(youtubePanel.node(), 'click', L.DomEvent.stopPropagation);

    // --- Attach closing logic to buttons ---
    storyCloseBtn.on("click", closeAllPanelsAndResetTabs);
    elevationCloseBtn.on("click", () => {
        elevationPanel.classed("is-open", false);
        tabsContainer.classed("hide-story", false);
    });

    youtubeCloseBtn.on("click", () => {
        youtubePanel.classed("is-open", false);
    });

    // --- Elevation Tab Click  ---
    elevationTab.on("click", () => {
        // If panel is already open, clicking the tab again closes it.
        const willBeOpen = !elevationPanel.classed("is-open");

        storyPanel.classed("is-open", false);
        elevationPanel.classed("is-open", willBeOpen);

        if (willBeOpen) {
            if (AppState.isFirstTimeElevationOpen) {
                elevationTab.classed("pulse-animation", false);
                AppState.isFirstTimeElevationOpen = false;
            }
            drawElevationProfile(AppState.currentDay);
        }
        map.once('click', closeAllPanelsAndResetTabs);
    });

    // --- Story Tab Click ---
    storyTab.on("click", () => {
        const isElevationOpen = elevationPanel.classed("is-open");
        const openStory = () => {
            storyPanel.classed("is-open", true);
            elevationPanel.classed("is-open", false);
            youtubePanel.classed("is-open", false);

            tabsContainer.classed("hide-story", true).classed("hide-elevation", true);
            d3.select("#youtube-tab").style("opacity", 0).style("pointer-events", "none");

            if (AppState.isFirstTimeStoryOpen) {
                storyTab.classed("pulse-animation", false);
                AppState.isFirstTimeStoryOpen = false;
                d3.selectAll(".next-day-btn").classed("pulse-animation", true);
            }
            map.once('click', closeAllPanelsAndResetTabs);
        };

        const wasOpen = storyPanel.classed("is-open");
        closeAllPanelsAndResetTabs();
        if (!wasOpen) {
            setTimeout(openStory, 50);
        }
    });

    // --- YouTube Tab Click ---
    youtubeTab.on("click", () => {
        const willBeOpen = !youtubePanel.classed("is-open");

        storyPanel.classed("is-open", false);
        youtubePanel.classed("is-open", willBeOpen);

        map.once('click', closeAllPanelsAndResetTabs);
    });
}

export function showPoiModal(poi) {
    const modalOverlay = d3.select("#poi-modal-overlay");
    const modalContent = d3.select("#poi-modal-content");
    const closeBtn = d3.select(".poi-modal-close-btn");
    const imgContainer = d3.select("#poi-modal-img-container");

    modalOverlay.classed("hidden", false).style("display", "flex");
    d3.select("#poi-modal-title").text(poi.title);
    d3.select("#poi-modal-description").text(poi.description);

    // Put the image container into its 'loading' state
    imgContainer.classed("is-loading", true);
    d3.select("#poi-modal-img").attr("src", "");

    // Preload the new image
    const img = new Image();
    img.src = poi.photoUrl;

    img.onload = () => {
        d3.select("#poi-modal-img").attr("src", poi.photoUrl);
        imgContainer.classed("is-loading", false);
    };

    img.onerror = () => {
        console.error("Modal image could not be loaded.");
        imgContainer.classed("is-loading", false);
    };

    modalOverlay.on("click", hidePoiModal);
    closeBtn.on("click", hidePoiModal);
    modalContent.on("click", (event) => {
        event.stopPropagation();
    });
}

function hidePoiModal() {
    const modalOverlay = d3.select("#poi-modal-overlay");
    modalOverlay.classed("hidden", true);
    modalOverlay.style("display", "none");
    modalOverlay.on("click", null);
}

export function setupResizeObserver() {
    const elevationPanelNode = d3.select("#elevation-panel").node();

    const resizeObserver = new ResizeObserver(() => {
        // Only redraw if a day is selected and the panel is visible
        if (AppState.currentDay > -1 && elevationPanel.classed("is-open")) {
            drawElevationProfile(AppState.currentDay);
        }
    });

    resizeObserver.observe(elevationPanelNode);
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

const photoElement = stagePhoto.node();
photoElement.addEventListener('load', () => {
    stagePhoto.classed('opacity-0', false);
});

d3.selectAll(".prev-day-btn").on("click", () => { 
    if (isMobile()) {
            closeAllMobilePanels();
        }
    const currentIndex = caminoMetadata.findIndex(d => d.day === AppState.currentDay);
    if (currentIndex > 0) {
        const prevDayData = caminoMetadata[currentIndex - 1];
        updateStory(prevDayData.day);
    }
});

d3.selectAll(".next-day-btn").on("click", () => { 
    if (isMobile()) {
        closeAllMobilePanels();
    }
    d3.selectAll(".next-day-btn").classed("pulse-animation", false);
    if (AppState.currentDay === -1) {
        updateStory(caminoMetadata[0].day);
    } else {
        const currentIndex = caminoMetadata.findIndex(d => d.day === AppState.currentDay);
        if (currentIndex > -1 && currentIndex < caminoMetadata.length - 1) {
            const nextDayData = caminoMetadata[currentIndex + 1];
            updateStory(nextDayData.day);
        }
    }
});