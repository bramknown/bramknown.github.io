import { CONFIG } from './config.js';

// Manages camera controls and navigation
export class CameraController {
    constructor(viewer) {
        this.viewer = viewer;
        this.defaultView = CONFIG.INITIAL_VIEW;
        this.bookmarks = new Map();
        this.animationDuration = 2000; // 2 seconds
        this.initializeControls();
    }
    
    // Initialize camera controls
    initializeControls() {
        this.setupKeyboardControls();
        this.setupMouseControls();
        this.setupTouchControls();
    }
    
    // Set up keyboard controls
    setupKeyboardControls() {
        const scene = this.viewer.scene;
        const canvas = scene.canvas;
        
        canvas.addEventListener('keydown', (event) => {
            const moveAmount = 100000; // meters
            const rotateAmount = 0.1; // radians
            
            switch (event.key) {
                case 'w':
                case 'W':
                    this.moveCameraForward(moveAmount);
                    break;
                case 's':
                case 'S':
                    this.moveCameraBackward(moveAmount);
                    break;
                case 'a':
                case 'A':
                    this.rotateCameraLeft(rotateAmount);
                    break;
                case 'd':
                case 'D':
                    this.rotateCameraRight(rotateAmount);
                    break;
                case 'q':
                case 'Q':
                    this.moveCameraUp(moveAmount);
                    break;
                case 'e':
                case 'E':
                    this.moveCameraDown(moveAmount);
                    break;
                case 'r':
                case 'R':
                    this.resetView();
                    break;
            }
        });
    }
    
    // Set up mouse controls
    setupMouseControls() {
        let isMouseDown = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        
        const canvas = this.viewer.scene.canvas;
        
        canvas.addEventListener('mousedown', (event) => {
            isMouseDown = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        });
        
        canvas.addEventListener('mousemove', (event) => {
            if (!isMouseDown) return;
            
            const deltaX = event.clientX - lastMouseX;
            const deltaY = event.clientY - lastMouseY;
            
            this.rotateCamera(deltaX * 0.01, deltaY * 0.01);
            
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        });
        
        canvas.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        
        // Mouse wheel for zoom
        canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            const zoomAmount = event.deltaY > 0 ? 1.1 : 0.9;
            this.zoomCamera(zoomAmount);
        });
    }
    
    // Set up touch controls for mobile
    setupTouchControls() {
        const canvas = this.viewer.scene.canvas;
        let touchStartDistance = 0;
        let lastTouchX = 0;
        let lastTouchY = 0;
        
        canvas.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                lastTouchX = event.touches[0].clientX;
                lastTouchY = event.touches[0].clientY;
            } else if (event.touches.length === 2) {
                const dx = event.touches[0].clientX - event.touches[1].clientX;
                const dy = event.touches[0].clientY - event.touches[1].clientY;
                touchStartDistance = Math.sqrt(dx * dx + dy * dy);
            }
        });
        
        canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();
            
            if (event.touches.length === 1) {
                const deltaX = event.touches[0].clientX - lastTouchX;
                const deltaY = event.touches[0].clientY - lastTouchY;
                
                this.rotateCamera(deltaX * 0.01, deltaY * 0.01);
                
                lastTouchX = event.touches[0].clientX;
                lastTouchY = event.touches[0].clientY;
            } else if (event.touches.length === 2) {
                const dx = event.touches[0].clientX - event.touches[1].clientX;
                const dy = event.touches[0].clientY - event.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                const scale = touchStartDistance / distance;
                this.zoomCamera(scale);
                
                touchStartDistance = distance;
            }
        });
    }
    
    // Move camera forward
    moveCameraForward(distance) {
        const camera = this.viewer.camera;
        const direction = camera.direction;
        camera.position = Cesium.Cartesian3.add(
            camera.position,
            Cesium.Cartesian3.multiplyByScalar(direction, distance, new Cesium.Cartesian3()),
            camera.position
        );
    }
    
    // Move camera backward
    moveCameraBackward(distance) {
        this.moveCameraForward(-distance);
    }
    
    // Move camera up
    moveCameraUp(distance) {
        const camera = this.viewer.camera;
        const up = camera.up;
        camera.position = Cesium.Cartesian3.add(
            camera.position,
            Cesium.Cartesian3.multiplyByScalar(up, distance, new Cesium.Cartesian3()),
            camera.position
        );
    }
    
    // Move camera down
    moveCameraDown(distance) {
        this.moveCameraUp(-distance);
    }
    
    // Rotate camera left
    rotateCameraLeft(angle) {
        const camera = this.viewer.camera;
        camera.rotateLeft(angle);
    }
    
    // Rotate camera right
    rotateCameraRight(angle) {
        this.rotateCameraLeft(-angle);
    }
    
    // Rotate camera by delta angles
    rotateCamera(deltaX, deltaY) {
        const camera = this.viewer.camera;
        camera.rotateRight(deltaX);
        camera.rotateUp(deltaY);
    }
    
    // Zoom camera
    zoomCamera(factor) {
        const camera = this.viewer.camera;
        camera.zoomIn(camera.positionCartographic.height * (1 - factor));
    }
    
    // Fly to specific location
    flyTo(longitude, latitude, height = 10000, heading = 0, pitch = -90, roll = 0) {
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
            orientation: {
                heading: Cesium.Math.toRadians(heading),
                pitch: Cesium.Math.toRadians(pitch),
                roll: Cesium.Math.toRadians(roll)
            },
            duration: this.animationDuration / 1000
        });
    }
    
    // Reset view to default
    resetView() {
        const view = this.defaultView;
        this.flyTo(view.longitude, view.latitude, view.height, view.heading, view.pitch, view.roll);
    }
    
    // Save current view as bookmark
    saveBookmark(name) {
        const camera = this.viewer.camera;
        const position = camera.positionCartographic;
        
        this.bookmarks.set(name, {
            longitude: Cesium.Math.toDegrees(position.longitude),
            latitude: Cesium.Math.toDegrees(position.latitude),
            height: position.height,
            heading: Cesium.Math.toDegrees(camera.heading),
            pitch: Cesium.Math.toDegrees(camera.pitch),
            roll: Cesium.Math.toDegrees(camera.roll)
        });
    }
    
    // Fly to bookmark
    flyToBookmark(name) {
        const bookmark = this.bookmarks.get(name);
        if (bookmark) {
            this.flyTo(
                bookmark.longitude,
                bookmark.latitude,
                bookmark.height,
                bookmark.heading,
                bookmark.pitch,
                bookmark.roll
            );
        }
    }
    
    // Get list of bookmarks
    getBookmarks() {
        return Array.from(this.bookmarks.keys());
    }
    
    // Get current camera information
    getCameraInfo() {
        const camera = this.viewer.camera;
        const position = camera.positionCartographic;
        
        return {
            longitude: Cesium.Math.toDegrees(position.longitude),
            latitude: Cesium.Math.toDegrees(position.latitude),
            height: position.height,
            heading: Cesium.Math.toDegrees(camera.heading),
            pitch: Cesium.Math.toDegrees(camera.pitch),
            roll: Cesium.Math.toDegrees(camera.roll)
        };
    }
}