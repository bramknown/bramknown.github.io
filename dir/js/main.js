import { GlobeManager } from './globe.js';

// Main application entry point
class EarthVisualizationApp {
    constructor() {
        this.globeManager = null;
        this.isRunning = false;
    }
    
    // Initialize the application
    async initialize() {
        try {
            console.log('Starting 3D Earth Visualization...');
            
            // Create globe manager
            this.globeManager = new GlobeManager('cesiumContainer');
            
            // Initialize globe
            await this.globeManager.initialize();
            
            this.isRunning = true;
            
            // Set up application-level event handlers
            this.setupEventHandlers();
            
            console.log('3D Earth Visualization application started successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to initialize 3D Earth visualization');
        }
    }
    
    // Set up application event handlers
    setupEventHandlers() {
        // Handle page unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
        
        // Handle visibility change (pause/resume rendering)
        document.addEventListener('visibilitychange', () => {
            if (this.globeManager && this.globeManager.getViewer()) {
                if (document.hidden) {
                    this.globeManager.getViewer().useDefaultRenderLoop = false;
                } else {
                    this.globeManager.getViewer().useDefaultRenderLoop = true;
                }
            }
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => {
            console.log('Connection restored');
            this.showNotification('Connection restored', 'success');
        });
        
        window.addEventListener('offline', () => {
            console.log('Connection lost');
            this.showNotification('Connection lost - some features may not work', 'warning');
        });
        
        // Handle errors
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.showError('An error occurred in the application');
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.showError('An unexpected error occurred');
        });
    }
    
    // Clean up resources
    cleanup() {
        console.log('Cleaning up application...');
        
        if (this.globeManager) {
            this.globeManager.destroy();
            this.globeManager = null;
        }
        
        this.isRunning = false;
    }
    
    // Show error message
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Get application state
    getState() {
        return {
            isRunning: this.isRunning,
            hasGlobe: !!this.globeManager,
            viewer: this.globeManager ? this.globeManager.getViewer() : null
        };
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const app = new EarthVisualizationApp();
    window.earthApp = app; // Make app globally accessible for debugging
    await app.initialize();
});

// Handle hot module replacement (for development)
//if (module.hot) {
    //module.hot.accept();
//}