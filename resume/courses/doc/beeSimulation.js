let bees = [];
let hive;
let cameraAngle = 0;
let frameCountLocal = 0;

// Live sensor metrics
let temp = 34.5;
let humidity = 55;
let co2 = 420;
let miteRisk = 12;
let healthScore = 92;
let alerts = [];

function setup() {
  let canvas = createCanvas(800, 600, WEBGL);
  canvas.parent('hiveCanvas'); // Attach canvas to the interactive-hive div
  hive = new Hive(0, 0, 0);
  for (let i = 0; i < 10; i++) {
    bees.push(new Bee());
  }
}

function draw() {
  background(135, 206, 235); // Sky blue background
  ambientLight(150); // Global soft light
  directionalLight(255, 255, 255, 0.5, -1, -0.3); // Directional sunlight
  pointLight(255, 255, 255, 0, -200, 200); // Overhead light

  camera(0, -100, 300, 0, 0, 0, 0, 1, 0);
  hive.display();
  for (let bee of bees) {
    bee.update();
    bee.display();
  }
  drawTechEffects();
}

function drawTechEffects() {
  // Occasional laser sweep
  if (frameCountLocal % 200 < 50) {
    push();
    stroke(255, 40, 40, 200);
    strokeWeight(2);
    let lx = sin(frameCountLocal * 0.09) * 25;
    line(lx, 35, 35, lx + random(-8, 8), 25, 35);
    // laser origin point
    noStroke();
    fill(255, 60, 60);
    translate(lx, 35, 35);
    sphere(3);
    pop();
  }
}


class Hive {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);
    this.width = 60;
    this.height = 60;
    this.depth = 60;
    this.stiltHeight = 40;
    this.entrance = createVector(0, this.height / 2, this.depth / 2);
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();

    // Draw main box (outer white surface)
    push();
    ambientMaterial(255); // White
    box(this.width, this.height, this.depth);
    pop();

    // Draw solar panel (corrected position and flat shape)
    push();
    translate(0, -this.height / 2 - 0.5, 0); // Sit directly on top
    ambientMaterial(0, 51, 102); // Dark blue
    box(this.width * 0.8, 1, this.depth * 0.8); // Thin box for panel
    pop();

    // Draw stilts
    let stiltRadius = 3;
    ambientMaterial(150, 75, 0); // Brown stilts
    const stiltOffset = 5;
    const halfW = this.width / 2 - stiltOffset;
    const halfD = this.depth / 2 - stiltOffset;
    const yOffset = this.height / 2 + this.stiltHeight / 2;

    // Four stilts
    push(); translate( halfW, yOffset,  halfD); cylinder(stiltRadius, this.stiltHeight); pop();
    push(); translate( halfW, yOffset, -halfD); cylinder(stiltRadius, this.stiltHeight); pop();
    push(); translate(-halfW, yOffset,  halfD); cylinder(stiltRadius, this.stiltHeight); pop();
    push(); translate(-halfW, yOffset, -halfD); cylinder(stiltRadius, this.stiltHeight); pop();

    // Draw entrance
    push();
    translate(this.entrance.x, this.entrance.y, this.entrance.z);
    ambientMaterial(0);
    sphere(5);
    pop();

    pop();
  }
}

class Bee {
  constructor() {
    this.reset();
  }
  
  reset() {
    // Start outside the canvas
    let angle = random(TWO_PI);
    let radius = 400;
    this.pos = createVector(cos(angle) * radius, random(-100, 100), sin(angle) * radius);
    this.t = 0;
    this.speed = random(0.002, 0.006); // Slower speed
    this.controlPoints = this.generatePath();
    this.direction = 1; // 1 for entering, -1 for exiting
  }
  
  generatePath() {
    let points = [];
    points.push(this.pos.copy());
    
    // If bee spawns behind (negative z), force a wide arc to the front
    if (this.pos.z < 0) {
      // Wide arc point to go around the hive
      let side = random([-1, 1]); // Randomly choose left or right arc
      let cp1 = createVector(
        side * 200, // Wide lateral movement
        random(-50, 50),
        150 // Position well in front of hive
      );
      // Closer to front face
      let cp2 = createVector(
        random(-50, 50),
        random(0, 30),
        80 // Near the front face
      );
      points.push(cp1);
      points.push(cp2);
    } else {
      // For bees not behind, go directly to front
      let cp1 = createVector(
        random(-100, 100),
        random(-50, 50),
        100 // Position in front of hive
      );
      let cp2 = createVector(
        random(-50, 50),
        random(0, 30),
        60 // Near the front face
      );
      points.push(cp1);
      points.push(cp2);
    }
    
    points.push(hive.entrance.copy());
    return points;
  }
  
  update() {
    this.t += this.speed * this.direction;
    if (this.t >= 1 || this.t <= 0) {
      if (this.t >= 1) {
        this.pos = hive.entrance.copy();
        this.controlPoints = this.generatePath();
        this.controlPoints[3] = this.pos;
        this.controlPoints[0] = createVector(random(-400, 400), random(-100, 100), random(-400, 400));
        this.t = 1;
        this.direction = -1;
      } else {
        this.reset();
      }
    }
    
    // Calculate position using cubic Bezier curve
    let t = this.t;
    let p0 = this.controlPoints[0];
    let p1 = this.controlPoints[1];
    let p2 = this.controlPoints[2];
    let p3 = this.controlPoints[3];
    
    let x = pow(1 - t, 3) * p0.x + 3 * pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * t * t * p2.x + t * t * t * p3.x;
    let y = pow(1 - t, 3) * p0.y + 3 * pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * t * t * p2.y + t * t * t * p3.y;
    let z = pow(1 - t, 3) * p0.z + 3 * pow(1 - t, 2) * t * p1.z + 3 * (1 - t) * t * t * p2.z + t * t * t * p3.z;
    
    this.pos.set(x, y, z);
    
    // Calculate orientation
    let nextT = t + 0.01 * this.direction;
    let nextX = pow(1 - nextT, 3) * p0.x + 3 * pow(1 - nextT, 2) * nextT * p1.x + 3 * (1 - nextT) * nextT * nextT * p2.x + nextT * nextT * nextT * p3.x;
    let nextZ = pow(1 - nextT, 3) * p0.z + 3 * pow(1 - nextT, 2) * nextT * p1.z + 3 * (1 - nextT) * nextT * nextT * p2.z + nextT * nextT * nextT * p3.z;
    this.angle = atan2(nextZ - z, nextX - x);
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.angle);
    
    // Bee body with yellow and black stripes
    noStroke();
    // Draw 4 segments for the body, alternating colors
    let segmentCount = 4;
    let segmentLength = 1.0; // Length of each segment along x-axis
    let segmentRadius = 1.5; // Radius of each segment
    for (let i = 0; i < segmentCount; i++) {
      push();
      translate(-1.5 + i * segmentLength, 0, 0); // Space segments along x-axis
      if (i % 2 === 0) {
        fill(255, 204, 0); // Yellow
      } else {
        fill(0, 0, 0); // Black
      }
      scale(1, 1.5, 1.5); // Match original body proportions
      sphere(segmentRadius);
      pop();
    }
    
    // Wings (semi-transparent white)
    fill(255, 255, 255, 100); // Semi-transparent white
    push();
    translate(0, -2, 2);
    rotateX(radians(45));
    scale(2, 0.5, 3);
    box(2);
    pop();
    push();
    translate(0, -2, -2);
    rotateX(radians(-45));
    scale(2, 0.5, 3);
    box(2);
    pop();
    
    // Head (yellow to match body)
    fill(255, 204, 0); // Bright yellow
    push();
    translate(3, 0, 0);
    sphere(1.5);
    pop();
    
    // Eyes
    fill(255); // White with slight shine
    push();
    translate(3, -0.6, 0.6);
    sphere(0.5);
    pop();
    push();
    translate(3, -0.6, -0.6);
    sphere(0.5);
    pop();
    
    pop();
  }
}