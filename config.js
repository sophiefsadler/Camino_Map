export const MAPBOX_API_KEY = 'pk.eyJ1Ijoic29waGllZnNhZGxlciIsImEiOiJjbWRoZzh6ZWswMGcwMmlzYmY0aXQ0eDRwIn0.yYZDvN6GCz0ibMJKN9qmhQ';

export const TOTAL_DAYS = 31;
export const DETAIL_THRESHOLD = 13;

// Colours
const originalColors = d3.schemeSet1; 
const colorsToRemove = [originalColors[2], originalColors[8]];
const customColors = originalColors.filter(color => !colorsToRemove.includes(color));
export const colorScale = d3.scaleOrdinal(customColors);