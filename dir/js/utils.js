// Utility functions for the 3D Earth visualization

export class GeoUtils {
    // Convert degrees to radians
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    // Convert radians to degrees
    static toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
    
    // Calculate distance between two points on Earth (Haversine formula)
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Earth's radius in meters
        const φ1 = this.toRadians(lat1);
        const φ2 = this.toRadians(lat2);
        const Δφ = this.toRadians(lat2 - lat1);
        const Δλ = this.toRadians(lon2 - lon1);
        
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        return R * c;
    }
    
    // Convert screen coordinates to geographic coordinates
    static screenToGeo(viewer, x, y) {
        const ray = viewer.camera.getPickRay(new Cesium.Cartesian2(x, y));
        const position = viewer.scene.globe.pick(ray, viewer.scene);
        
        if (position) {
            const cartographic = Cesium.Cartographic.fromCartesian(position);
            return {
                longitude: this.toDegrees(cartographic.longitude),
                latitude: this.toDegrees(cartographic.latitude),
                height: cartographic.height
            };
        }
        return null;
    }
}

export class DataUtils {
    // Load JSON data
    static async loadJSON(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error loading JSON:', error);
            return null;
        }
    }
    
    // Load image texture
    static loadTexture(url) {
        return new Promise((resolve, reject) => {
            const texture = new Image();
            texture.onload = () => resolve(texture);
            texture.onerror = reject;
            texture.src = url;
        });
    }
    
    // Debounce function for performance optimization
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

export class UIUtils {
    // Show loading indicator
    static showLoading() {
        const loadingElement = document.getElementById('loadingIndicator');
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }
    }
    
    // Hide loading indicator
    static hideLoading() {
        const loadingElement = document.getElementById('loadingIndicator');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
    
    // Show notification
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}