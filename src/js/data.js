// ==========================================================================
// IMPORTS
// ==========================================================================

import { pathDataCache } from './state.js';
import { caminoMetadata } from './camino-metadata.js';


// ==========================================================================
// EXPORTED DATA FUNCTIONS
// ==========================================================================

export async function getPathData(dayNumber) {
    if (pathDataCache[dayNumber]) {
        return pathDataCache[dayNumber];
    }
    const path = `../../assets/data/day_${String(dayNumber).padStart(2, '0')}.json`;
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

export async function fetchAllPathData() {
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