import { CONFIG } from './config.js';
import { UIUtils } from './utils.js';
import { DataSourceManager } from './data-sources.js';
import { LayerManager } from './layers.js';
import { CameraController } from './controls.js';
import { UIComponentManager } from './ui-components.js';

// Main globe manager that coordinates all components
export class GlobeManager {
    constructor(containerId) {
        this.containerId = containerId;
        this.viewer = null;
        this.dataSourceManager = null;
        this.layerManager = null;
        this.cameraController = null;
        this.uiComponentManager = null;
        this.isInitialized = false;
    }
    
    // Initialize the entire globe system
    async initialize() {
        try {
            UIUtils.showLoading();
            
            // Initialize Cesium viewer
            await this.initializeViewer();
            
            // Initialize managers
            await this.initializeManagers();
            
            // Set up event handlers
            this.setupEventHandlers();
            
            // Perform initial setup
            await this.performInitialSetup();
            
            this.isInitialized = true;
            UIUtils.hideLoading();
            UIUtils.showNotification('3D Earth visualization loaded successfully!');
            
            console.log('Globe system initialized successfully');
        } catch (error) {
            console.error('Error initializing globe system:', error);
            UIUtils.hideLoading();
            UIUtils.showNotification('Failed to load 3D Earth visualization', 'error');
        }
    }
    
    // Initialize Cesium viewer
    async initializeViewer() {
        // Configure Cesium
        Cesium.Ion.defaultAccessToken = CONFIG.CESIUM_TOKEN;
        
        // Create viewer
        this.viewer = new Cesium.Viewer(this.containerId, {
            terrainProvider: Cesium.createWorldTerrain(),
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
            shadows: CONFIG.VISUAL.ENABLE_SHADOWS,
            terrainShadows: Cesium.ShadowMode.ENABLED,
            scene3DOnly: true,
            selectionIndicator: false,
            infoBox: false
        });
        
        // Configure scene
        this.viewer.scene.globe.enableLighting = CONFIG.VISUAL.DAY_NIGHT_CYCLE;
        this.viewer.scene.globe.atmosphereLightIntensity = 0.5;
        this.viewer.scene.globe.atmosphereHueShift = 0.1;
        this.viewer.scene.globe.atmosphereSaturationShift = 0.2;
        this.viewer.scene.globe.atmosphereBrightnessShift = 0.1;
        
        // Configure camera
        this.viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(
                CONFIG.INITIAL_VIEW.longitude,
                CONFIG.INITIAL_VIEW.latitude,
                CONFIG.INITIAL_VIEW.height
            ),
            orientation: {
                heading: Cesium.Math.toRadians(CONFIG.INITIAL_VIEW.heading),
                pitch: Cesium.Math.toRadians(CONFIG.INITIAL_VIEW.pitch),
                roll: Cesium.Math.toRadians(CONFIG.INITIAL_VIEW.roll)
            }
        });
        
        console.log('Cesium viewer initialized');
    }
    
    // Initialize all managers
    async initializeManagers() {
        // Data source manager
        this.dataSourceManager = new DataSourceManager(this.viewer);
        await this.dataSourceManager.initialize();
        
        // Layer manager
        this.layerManager = new LayerManager(this.viewer);
        
        // Camera controller
        this.cameraController = new CameraController(this.viewer);
        
        // UI component manager
        this.uiComponentManager = new UIComponentManager(
            this.viewer,
            this.cameraController,
            this.layerManager,
            this.dataSourceManager
        );
        
        console.log('All managers initialized');
    }
    
    // Set up event handlers
    setupEventHandlers() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.viewer.resize();
        });
        
        // Handle scene render errors
        this.viewer.scene.renderError.addEventListener((error) => {
            console.error('Scene render error:', error);
            UIUtils.showNotification('Rendering error occurred', 'error');
        });
        
        // Handle data source loading errors
        this.viewer.dataSources.dataSourceAdded.addEventListener((dataSource) => {
            console.log('Data source added:', dataSource.name);
        });
        
        this.viewer.dataSources.dataSourceRemoved.addEventListener((dataSource) => {
            console.log('Data source removed:', dataSource.name);
        });
        
        // Handle camera changes
        this.viewer.camera.changed.addEventListener(() => {
            // Update UI based on camera position
            const height = this.viewer.camera.positionCartographic.height;
            if (height < 10000) {
                // Low altitude - show detailed layers
                this.layerManager.toggleOverlay('boundaries', true);
            } else {
                // High altitude - hide detailed layers
                this.layerManager.toggleOverlay('boundaries', false);
            }
        });
    }
    
    // Perform initial setup
    async performInitialSetup() {
        // Add initial entities
        this.addInitialEntities();
        
        // Set up performance optimizations
        this.setupPerformanceOptimizations();
        
        // Load saved settings
        this.loadSavedSettings();
    }
    
    // Add initial entities
    addInitialEntities() {
        // Add a few sample locations
        const sampleLocations = [
            { name: 'Mount Everest', lat: 27.9881, lon: 86.9250, height: 8848 },
            { name: 'Mariana Trench', lat: 11.3730, lon: 142.5910, height: -11034 },
            { name: 'Sahara Desert', lat: 30.0000, lon: 10.0000, height: 0 }
        ];
        
        sampleLocations.forEach(location => {
            this.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(location.lon, location.lat, location.height),
                point: {
                    pixelSize: 8,
                    color: location.height > 0 ? Cesium.Color.GREEN : Cesium.Color.BLUE,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2
                },
                label: {
                    text: location.name,
                    font: '12px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -10)
                }
            });
        });
    }
    
    // Set up performance optimizations
    setupPerformanceOptimizations() {
        // Enable frustum culling
        this.viewer.scene.frustumCulled = CONFIG.PERFORMANCE.ENABLE_FRUSTUM_CULLING;
        
        // Set maximum terrain level
        this.viewer.scene.globe.maximumScreenSpaceError = 2;
        
        // Configure LOD
        if (CONFIG.PERFORMANCE.ENABLE_LOD) {
            this.viewer.scene.globe.tileCacheSize = 100;
            this.viewer.scene.globe.loadingDescendantLimit = 20;
        }
        
        // Disable unnecessary features for performance
        this.viewer.scene.skyBox.show = false;
        this.viewer.scene.moon.show = false;
        this.viewer.scene.sun.show = true;
    }
    
    // Load saved settings
    loadSavedSettings() {
        const savedSettings = localStorage.getItem('globeSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                // Apply saved settings
                if (settings.baseLayer) {
                    this.layerManager.switchBaseLayer(settings.baseLayer);
                    document.getElementById('baseLayerSelect').value = settings.baseLayer;
                }
                if (settings.buildings !== undefined) {
                    document.getElementById('buildingsToggle').checked = settings.buildings;
                    this.dataSourceManager.toggleDataSource('buildings', settings.buildings);
                }
                if (settings.terrain !== undefined) {
                    document.getElementById('terrainToggle').checked = settings.terrain;
                    this.viewer.scene.globe.depthTestAgainstTerrain = settings.terrain;
                }
            } catch (error) {
                console.error('Error loading saved settings:', error);
            }
        }
    }
    
    // Save current settings
    saveSettings() {
        const settings = {
            baseLayer: this.layerManager.currentBaseLayer,
            buildings: document.getElementById('buildingsToggle').checked,
            terrain: document.getElementById('terrainToggle').checked,
            camera: this.cameraController.getCameraInfo()
        };
        
        localStorage.setItem('globeSettings', JSON.stringify(settings));
    }
    
    // Public methods
    getViewer() {
        return this.viewer;
    }
    
    getCameraController() {
        return this.cameraController;
    }
    
    getLayerManager() {
        return this.layerManager;
    }
    
    getDataSourceManager() {
        return this.dataSourceManager;
    }
    
    // Destroy the globe
    destroy() {
        if (this.isInitialized) {
            this.saveSettings();
            this.viewer.destroy();
            this.isInitialized = false;
        }
    }
}