import { CONFIG } from './config.js';
import { DataUtils } from './utils.js';

// Manages various data sources for the 3D globe
export class DataSourceManager {
    constructor(viewer) {
        this.viewer = viewer;
        this.dataSources = new Map();
        this.loadedTilesets = new Map();
    }
    
    // Initialize default data sources
    async initialize() {
        try {
            // Load 3D buildings
            await this.load3DBuildings();
            
            // Load terrain data
            await this.loadTerrain();
            
            // Load additional data layers
            await this.loadAdditionalLayers();
            
            console.log('Data sources initialized successfully');
        } catch (error) {
            console.error('Error initializing data sources:', error);
        }
    }
    
// Load Cesium OSM Buildings (works with Ion token)
    async load3DBuildings() {
        try {
            const buildingsTileset = new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(96188)
            });
            this.viewer.scene.primitives.add(buildingsTileset);
            this.loadedTilesets.set('buildings', buildingsTileset);
            
            console.log('✅ 3D Buildings loaded from Cesium OSM');
            UIUtils.showNotification('3D Buildings enabled');
        } catch (error) {
            console.warn('3D Buildings failed (needs Cesium Ion token):', error.message);
        }
    }
    async loadBasicBuildings() {
        try {
                console.log('Skipping basic buildings (no API key)');
        } catch (error) {
            console.error('Error loading basic buildings:', error);
        }
    }
    
    // Skip terrain provider (non-blocking)
    async loadTerrain() {
        console.log('Using Cesium default terrain');
    }
    
    // Load additional data layers (no base imagery)
    async loadAdditionalLayers() {
        // Weather data layer
        await this.loadWeatherData();
        
        // Points of interest (no base imagery - managed by LayerManager)
        await this.loadPOIs();
    }
    
    // Load weather data
    async loadWeatherData() {
        try {
            // This would typically come from a weather API
            // For demonstration, we'll create sample weather points
            const weatherData = [
                { lat: 40.7128, lon: -74.0060, temp: 22, condition: 'sunny' },
                { lat: 51.5074, lon: -0.1278, temp: 15, condition: 'cloudy' },
                { lat: 35.6762, lon: 139.6503, temp: 28, condition: 'rainy' }
            ];
            
            weatherData.forEach(weather => {
                const position = Cesium.Cartesian3.fromDegrees(weather.lon, weather.lat);
                const entity = this.viewer.entities.add({
                    position: position,
                    billboard: {
                        image: this.getWeatherIcon(weather.condition),
                        scale: 0.5,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    },
                    description: `Temperature: ${weather.temp}°C<br>Condition: ${weather.condition}`
                });
            });
        } catch (error) {
            console.error('Error loading weather data:', error);
        }
    }
    
    // Get weather icon based on condition
    getWeatherIcon(condition) {
        const icons = {
            sunny: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iOCIgZmlsbD0iI0ZGRDcwMCIvPgo8L3N2Zz4K',
            cloudy: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTAiIGZpbGw9IiM4ODg4ODgiLz4KPC9zdmc+Cg==',
            rainy: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzQ2ODJCNCIvPgo8cmVjdCB4PSIxMiIgeT0iMTgiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiIGZpbGw9IiM0NjgyQjQiLz4KPHJlY3QgeD0iMTgiIHk9IjIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI2IiBmaWxsPSIjNDY4MkI0Ii8+Cjwvc3ZnPgo='
        };
        return icons[condition] || icons.sunny;
    }
    
    // Removed loadSatelliteImagery(): base layers now managed exclusively by LayerManager to prevent duplicates
    
    // Load points of interest
    async loadPOIs() {
        try {
            // Sample POIs - in a real application, this would come from an API
            const pois = [
                { name: 'Statue of Liberty', lat: 40.6892, lon: -74.0445, type: 'monument' },
                { name: 'Eiffel Tower', lat: 48.8584, lon: 2.2945, type: 'monument' },
                { name: 'Great Wall of China', lat: 40.4319, lon: 116.5704, type: 'historic' },
                { name: 'Sydney Opera House', lat: -33.8568, lon: 151.2153, type: 'theater' }
            ];
            
            pois.forEach(poi => {
                const position = Cesium.Cartesian3.fromDegrees(poi.lon, poi.lat);
                const entity = this.viewer.entities.add({
                    position: position,
                    point: {
                        pixelSize: 8,
                        color: Cesium.Color.YELLOW,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 2
                    },
                    label: {
                        text: poi.name,
                        font: '12px sans-serif',
                        fillColor: Cesium.Color.WHITE,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 2,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(0, -10)
                    },
                    description: `<h3>${poi.name}</h3><p>Type: ${poi.type}</p>`
                });
            });
        } catch (error) {
            console.error('Error loading POIs:', error);
        }
    }
    
    // Toggle data source visibility
    toggleDataSource(name, visible) {
        const tileset = this.loadedTilesets.get(name);
        if (tileset) {
            tileset.show = visible;
        }
    }
    
    // Remove data source
    removeDataSource(name) {
        const tileset = this.loadedTilesets.get(name);
        if (tileset) {
            this.viewer.scene.primitives.remove(tileset);
            this.loadedTilesets.delete(name);
        }
    }
    
    // Get all loaded data sources
    getLoadedSources() {
        return Array.from(this.loadedTilesets.keys());
    }
}