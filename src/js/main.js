// ==========================================================================
// IMPORTS
// ==========================================================================

import { AppState } from './state.js';
import { caminoMetadata } from './camino-metadata.js';
import { fetchAllPathData } from './data.js';
import { 
    initializeMapLayers, 
    zoomToDay, 
    casingLayer, 
    colorLayer, 
    styleCasing, 
    stylePath 
} from './map-setup.js';
import { 
    setInitialStoryPanel, 
    updatePanelContent, 
    updateUIVisibility, 
    updateButtonStates 
} from './ui-logic.js';

// ==========================================================================
// ORCHESTRATOR FUNCTIONS
// ==========================================================================

export function updateStory(dayNumber) {
    // Update the application's current state
    AppState.currentDay = dayNumber;
    const dayData = caminoMetadata.find(d => d.day === dayNumber);
    if (!dayData) return;

    updatePanelContent(dayData);
    updateUIVisibility(dayData);
    updateButtonStates(dayNumber);

    if (AppState.currentDay === 0) {
        casingLayer.setStyle({ opacity: 0 });
        colorLayer.setStyle({ opacity: 0 });
    } else {
        casingLayer.setStyle(styleCasing);
        colorLayer.setStyle(stylePath);
    }

    zoomToDay(dayData);
}

async function setInitialView() {
    const features = await fetchAllPathData();
    if (features) {
        initializeMapLayers(features);
    }

    setInitialStoryPanel();
}

// ==========================================================================
// START THE APPLICATION
// ==========================================================================

setInitialView();