// Configuration settings for the 3D Earth visualization
export const CONFIG = {
    // Cesium Ion access token (you'll need to get your own)
    CESIUM_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzOGQ4NTY0Ny1jYTRhLTQ0M2MtYTk5MS1hYzQxOWQ5YjM2NWQiLCJpZCI6MzU5Mjg3LCJpYXQiOjE3NjI4NTg3NzZ9.J36v5AMCV71cKdP08WGTkbK8cNyIXSIsfIpIIOY4KZc',
    
    // Initial camera position
    INITIAL_VIEW: {
        longitude: -122.4194,
        latitude: 37.7749,
        height: 10000000, // 10,000 km
        heading: 0.0,
        pitch: -90.0,
        roll: 0.0
    },
    
    // Data sources
    DATA_SOURCES: {
        OSM_BUILDINGS: 'https://assets.cesium.com/96188/tileset.json',
        TERRAIN: 'https://assets.cesium.com/1/tileset.json',
        IMAGERY: {
            satellite: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            street: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            terrain: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
        }
    },
    
    // Visual settings
    VISUAL: {
        GLOBE_COLOR: '#2E8B57',
        ATMOSPHERE_COLOR: '#87CEEB',
        DAY_NIGHT_CYCLE: true,
        ENABLE_SHADOWS: true
    },
    
    // Performance settings
    PERFORMANCE: {
        MAX_TERRAIN_LEVEL: 18,
        ENABLE_FRUSTUM_CULLING: true,
        ENABLE_LOD: true
    }
};

// API Keys for various services
export const API_KEYS = {
    GOOGLE_MAPS: 'demo',
    OPENWEATHER: 'demo',
    NASA: 'demo'
};