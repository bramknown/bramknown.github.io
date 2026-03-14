import { UIUtils } from './utils.js';

// Manages UI components and interactions
export class UIComponentManager {
    constructor(viewer, cameraController, layerManager, dataSourceManager) {
        this.viewer = viewer;
        this.cameraController = cameraController;
        this.layerManager = layerManager;
        this.dataSourceManager = dataSourceManager;
        this.initializeUI();
    }
    
    // Initialize all UI components
    initializeUI() {
        this.setupControlsPanel();
        this.setupSearch();
        this.setupInfoPanel();
        this.setupKeyboardShortcuts();
        this.setupContextMenu();
    }
    
    // Set up controls panel
    setupControlsPanel() {
        const baseLayerSelect = document.getElementById('baseLayerSelect');
        const buildingsToggle = document.getElementById('buildingsToggle');
        const terrainToggle = document.getElementById('terrainToggle');
        const resetViewBtn = document.getElementById('resetViewBtn');
        
        // Base layer selection
        baseLayerSelect.addEventListener('change', (event) => {
            this.layerManager.switchBaseLayer(event.target.value);
            UIUtils.showNotification(`Switched to ${event.target.value} view`);
        });
        
        // Buildings toggle
        buildingsToggle.addEventListener('change', (event) => {
            this.dataSourceManager.toggleDataSource('buildings', event.target.checked);
            UIUtils.showNotification(`3D Buildings ${event.target.checked ? 'enabled' : 'disabled'}`);
        });
        
        // Terrain toggle
        terrainToggle.addEventListener('change', (event) => {
            this.viewer.scene.globe.depthTestAgainstTerrain = event.target.checked;
            UIUtils.showNotification(`3D Terrain ${event.target.checked ? 'enabled' : 'disabled'}`);
        });
        
        // Reset view button
        resetViewBtn.addEventListener('click', () => {
            this.cameraController.resetView();
            UIUtils.showNotification('View reset to default');
        });
    }
    
    // Set up search functionality
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        const performSearch = async () => {
            const query = searchInput.value.trim();
            if (!query) return;
            
            try {
                UIUtils.showLoading();
                
                // Use Nominatim geocoding service (OpenStreetMap)
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const results = await response.json();
                
                if (results.length > 0) {
                    const result = results[0];
                    const lat = parseFloat(result.lat);
                    const lon = parseFloat(result.lon);
                    
                    this.cameraController.flyTo(lon, lat, 5000);
                    
                    // Add marker
                    const marker = this.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(lon, lat),
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.RED,
                            outlineColor: Cesium.Color.WHITE,
                            outlineWidth: 2
                        },
                        label: {
                            text: result.display_name,
                            font: '14px sans-serif',
                            fillColor: Cesium.Color.WHITE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            pixelOffset: new Cesium.Cartesian2(0, -10)
                        }
                    });
                    
                    // Remove marker after 10 seconds
                    setTimeout(() => {
                        this.viewer.entities.remove(marker);
                    }, 10000);
                    
                    UIUtils.showNotification(`Found: ${result.display_name}`);
                } else {
                    UIUtils.showNotification('Location not found', 'error');
                }
            } catch (error) {
                console.error('Search error:', error);
                UIUtils.showNotification('Search failed', 'error');
            } finally {
                UIUtils.hideLoading();
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Set up info panel
    setupInfoPanel() {
        const infoPanel = document.getElementById('infoPanel');
        const locationInfo = document.getElementById('locationInfo');
        
        // Show coordinates on mouse move
        this.viewer.scene.canvas.addEventListener('mousemove', (event) => {
            const ray = this.viewer.camera.getPickRay(new Cesium.Cartesian2(event.clientX, event.clientY));
            const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            
            if (position) {
                const cartographic = Cesium.Cartographic.fromCartesian(position);
                const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
                const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
                const height = cartographic.height.toFixed(2);
                
                locationInfo.innerHTML = `
                    <p><strong>Coordinates:</strong></p>
                    <p>Latitude: ${latitude}°</p>
                    <p>Longitude: ${longitude}°</p>
                    <p>Elevation: ${height} m</p>
                `;
            }
        });
    }
    
    // Set up keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Check if the user is typing in an input field
            if (event.target.tagName === 'INPUT') return;
            
            switch (event.key) {
                case '1':
                    this.layerManager.switchBaseLayer('satellite');
                    break;
                case '2':
                    this.layerManager.switchBaseLayer('street');
                    break;
                case '3':
                    this.layerManager.switchBaseLayer('terrain');
                    break;
                case 'b':
                case 'B':
                    const buildingsToggle = document.getElementById('buildingsToggle');
                    buildingsToggle.checked = !buildingsToggle.checked;
                    buildingsToggle.dispatchEvent(new Event('change'));
                    break;
                case 't':
                case 'T':
                    const terrainToggle = document.getElementById('terrainToggle');
                    terrainToggle.checked = !terrainToggle.checked;
                    terrainToggle.dispatchEvent(new Event('change'));
                    break;
            }
        });
    }
    
    // Set up context menu
    setupContextMenu() {
        const contextMenu = document.createElement('div');
        contextMenu.id = 'contextMenu';
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <ul>
                <li id="bookmarkLocation">Bookmark Location</li>
                <li id="measureDistance">Measure Distance</li>
                <li id="addMarker">Add Marker</li>
                <li id="getCoordinates">Get Coordinates</li>
            </ul>
        `;
        document.body.appendChild(contextMenu);
        
        let contextPosition = null;
        
        // Show context menu on right click
        this.viewer.scene.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            
            const ray = this.viewer.camera.getPickRay(new Cesium.Cartesian2(event.clientX, event.clientY));
            const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            
            if (position) {
                contextPosition = Cesium.Cartographic.fromCartesian(position);
                contextMenu.style.display = 'block';
                contextMenu.style.left = event.pageX + 'px';
                contextMenu.style.top = event.pageY + 'px';
            }
        });
        
        // Hide context menu on click elsewhere
        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });
        
        // Context menu actions
        document.getElementById('bookmarkLocation').addEventListener('click', () => {
            if (contextPosition) {
                const name = prompt('Enter bookmark name:');
                if (name) {
                    this.cameraController.saveBookmark(name);
                    UIUtils.showNotification(`Bookmark "${name}" saved`);
                }
            }
        });
        
        document.getElementById('getCoordinates').addEventListener('click', () => {
            if (contextPosition) {
                const longitude = Cesium.Math.toDegrees(contextPosition.longitude).toFixed(6);
                const latitude = Cesium.Math.toDegrees(contextPosition.latitude).toFixed(6);
                alert(`Coordinates:\nLatitude: ${latitude}°\nLongitude: ${longitude}°`);
            }
        });
        
        document.getElementById('addMarker').addEventListener('click', () => {
            if (contextPosition) {
                const name = prompt('Enter marker name:');
                if (name) {
                    const position = Cesium.Cartesian3.fromRadians(
                        contextPosition.longitude,
                        contextPosition.latitude,
                        contextPosition.height
                    );
                    
                    this.viewer.entities.add({
                        position: position,
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.BLUE,
                            outlineColor: Cesium.Color.WHITE,
                            outlineWidth: 2
                        },
                        label: {
                            text: name,
                            font: '14px sans-serif',
                            fillColor: Cesium.Color.WHITE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            pixelOffset: new Cesium.Cartesian2(0, -10)
                        }
                    });
                    
                    UIUtils.showNotification(`Marker "${name}" added`);
                }
            }
        });
    }
}