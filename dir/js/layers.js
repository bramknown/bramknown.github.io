import { CONFIG } from './config.js';

// Manages different imagery and data layers
export class LayerManager {
    constructor(viewer) {
        this.viewer = viewer;
        this.layers = new Map();
        this.currentBaseLayer = 'satellite';
        this.initializeLayers();
    }
    
    // Initialize default layers
    initializeLayers() {
        this.createBaseLayers();
        this.createOverlayLayers();
    }
    
    // Create base imagery layers - preload all, show only satellite
    createBaseLayers() {
        // Remove default base layer
        this.viewer.imageryLayers.removeAll();
        
        // Create and add ALL base layers
        const satelliteLayer = new Cesium.ImageryLayer(
            new Cesium.UrlTemplateImageryProvider({
                url: CONFIG.DATA_SOURCES.IMAGERY.satellite,
                maximumLevel: 18
            })
        );
        satelliteLayer.show = true; // Default visible
        this.viewer.imageryLayers.add(satelliteLayer, 0);
        this.layers.set('satellite', satelliteLayer);
        
        const streetLayer = new Cesium.ImageryLayer(
            new Cesium.UrlTemplateImageryProvider({
                url: CONFIG.DATA_SOURCES.IMAGERY.street,
                maximumLevel: 18
            })
        );
        streetLayer.show = false; // Initially hidden
        this.viewer.imageryLayers.add(streetLayer, 1);
        this.layers.set('street', streetLayer);
        
        const terrainLayer = new Cesium.ImageryLayer(
            new Cesium.UrlTemplateImageryProvider({
                url: CONFIG.DATA_SOURCES.IMAGERY.terrain,
                maximumLevel: 18
            })
        );
        terrainLayer.show = false; // Initially hidden
        this.viewer.imageryLayers.add(terrainLayer, 2);
        this.layers.set('terrain', terrainLayer);
        
        console.log('All base layers preloaded:', ['satellite', 'street', 'terrain']);
    }
    
    // Create overlay layers
    createOverlayLayers() {
        // Weather overlay
        this.createWeatherOverlay();
        
        // Transportation overlay
        this.createTransportationOverlay();
        
        // Boundaries overlay
        this.createBoundariesOverlay();
    }
    
    // Create weather overlay
    createWeatherOverlay() {
        try {
            const weatherLayer = new Cesium.ImageryLayer(
                new Cesium.UrlTemplateImageryProvider({
                    url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=' + CONFIG.API_KEYS.OPENWEATHER,
                    maximumLevel: 18,
                    alpha: 0.6
                })
            );
            this.layers.set('weather', weatherLayer);
            console.log('Weather overlay created');
        } catch (error) {
            console.warn('Skipping weather overlay:', error.message);
        }
    }
    
    // Create transportation overlay
    createTransportationOverlay() {
        const transportLayer = new Cesium.ImageryLayer(
            new Cesium.UrlTemplateImageryProvider({
                url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
                maximumLevel: 18,
                alpha: 0.7
            })
        );
        this.layers.set('transportation', transportLayer);
    }
    
    // Create boundaries overlay
    createBoundariesOverlay() {
        const boundariesLayer = new Cesium.ImageryLayer(
            new Cesium.UrlTemplateImageryProvider({
                url: 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
                maximumLevel: 18,
                alpha: 0.8
            })
        );
        this.layers.set('boundaries', boundariesLayer);
    }
    
    // Switch base layer - enhanced with refresh, logging, proper visibility
    switchBaseLayer(layerName) {
        console.log(`🔄 Switching base layer from "${this.currentBaseLayer}" → "${layerName}"`);
        
        if (!this.layers.has(layerName)) {
            console.error(`❌ Layer "${layerName}" not found in layers Map`);
            return false;
        }
        
        // Hide ALL base layers first
        const baseLayerNames = ['satellite', 'street', 'terrain'];
        baseLayerNames.forEach(name => {
            const layer = this.layers.get(name);
            if (layer) {
                layer.show = false;
                layer.alpha = 0.0;
            }
        });
        
        // Show and prioritize new layer at bottom
        const newLayer = this.layers.get(layerName);
        newLayer.show = true;
        newLayer.alpha = 1.0;
        
        // Ensure it's at base (index 0)
        const currentIndex = this.viewer.imageryLayers.indexOf(newLayer);
        if (currentIndex !== 0) {
            this.viewer.imageryLayers.lowerToBottom(newLayer);
        }
        
        // Force refresh tiles
        try {
            newLayer.forceRefresh();
        } catch (e) {
            console.warn('Layer refresh not supported:', e);
        }
        
        this.currentBaseLayer = layerName;
        console.log(`✅ Layer "${layerName}" activated at index ${this.viewer.imageryLayers.indexOf(newLayer)}`);
        return true;
    }
    
    // Toggle overlay layer
    toggleOverlay(layerName, visible) {
        if (!this.layers.has(layerName)) return false;
        
        const layer = this.layers.get(layerName);
        if (visible) {
            if (!this.viewer.imageryLayers.contains(layer)) {
                this.viewer.imageryLayers.add(layer);
            }
            layer.show = true;
        } else {
            layer.show = false;
        }
        
        return true;
    }
    
    // Adjust layer opacity
    setLayerOpacity(layerName, opacity) {
        if (!this.layers.has(layerName)) return false;
        
        const layer = this.layers.get(layerName);
        layer.alpha = Math.max(0, Math.min(1, opacity));
        return true;
    }
    
    // Get layer information
    getLayerInfo(layerName) {
        if (!this.layers.has(layerName)) return null;
        
        const layer = this.layers.get(layerName);
        return {
            name: layerName,
            visible: layer.show,
            opacity: layer.alpha,
            type: layerName === 'satellite' || layerName === 'street' || layerName === 'terrain' ? 'base' : 'overlay'
        };
    }
    
    // Get all layers
    getAllLayers() {
        const layerInfo = [];
        this.layers.forEach((layer, name) => {
            layerInfo.push(this.getLayerInfo(name));
        });
        return layerInfo;
    }
}