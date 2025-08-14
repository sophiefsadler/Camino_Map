export const AppState = {
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

export const pathDataCache = {};