const NUM_OF_POINTS = 800;

class Point {
    constructor(x, y, z, r) {
        this.pos = createVector(x, y, z);
        this.radius = r;
        this.speed = 240 * random(0.2, 0.6);
    }

    draw() {
        const brightness = abs(1 * sin((TWO_PI * frameCount * 0.5) / this.speed));
        push();
        strokeWeight(1 * brightness);
        stroke("#00bacc");
        beginShape();
        vertex(this.pos.x * brightness, this.pos.y * brightness, this.pos.z * brightness);
        vertex(this.pos.x, this.pos.y, this.pos.z);
        endShape();
        translate(this.pos.x, this.pos.y, this.pos.z);
        noStroke();
        fill(255, 255, 255, 255);
        sphere(this.radius * brightness);
        pop();
    }
}

let pointCloud;

function createPointCloud(radius, numOfPoints) {
    pointCloud = [];
    const RADIAN = PI / 180;
    for (let i = 0; i < numOfPoints; i++) {
        const t1 = 360 * random() * RADIAN;
        const t2 = (180 * random() - 90) * RADIAN;
        const x = radius * cos(t2) * sin(t1);
        const y = radius * sin(t2);
        const z = radius * cos(t2) * cos(t1);
        pointCloud.push(new Point(x, y, z, 2));
    }
}

function drawPointCloud() {
    for (let i = pointCloud.length - 1; i >= 0; i--) {
        const point = pointCloud[i];
        point.draw();
    }
}

let parent;
let canvas;

function setup() {
    parent = document.getElementById("parent");
    canvas = createCanvas(parent.clientWidth, parent.clientHeight, WEBGL);
    canvas.parent(parent);
    createPointCloud(min(width, height) / 4, NUM_OF_POINTS);
}

function windowResized() {
    parent = document.getElementById("parent");
    resizeCanvas(parent.clientWidth, parent.clientHeight);
    createPointCloud(min(width, height) / 4, NUM_OF_POINTS);
}

function draw() {
    background(0);
    rotateY(frameCount * 0.01);
    drawPointCloud();
}
