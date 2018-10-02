// Global Varialbes
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let WIDTH = 0;
let HEIGHT = 0;
let CoordSystem;


// On Load
document.addEventListener("DOMContentLoaded", () => {
    // Add Canvas to Document
    document.body.appendChild(canvas);

    // Set Properties
    canvas.width = WIDTH = window.innerWidth;
    canvas.height = HEIGHT = window.innerHeight;


    // Setup
    CoordSystem = new CoordinateSystem(WIDTH, HEIGHT, 10);
    CoordSystem.addVector(10, 10);

    // Adding a Matrix Object of m by 2 Dimensions
    CoordSystem.addVector(
        Matrix.fromArray([

            [8, 5],
            [-10, -10],
            [-6, 15],
            [20, -15]

        ]));

    // Init Drawing
    draw();
});

// On Resize Event
window.addEventListener("resize", () => {
    // Reset Canvas Dimensions
    canvas.width = WIDTH = window.innerWidth;
    canvas.height = HEIGHT = window.innerHeight;

    CoordSystem.resize(WIDTH, HEIGHT);
});


// Functions
function background(r: number, g: number, b: number) {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function draw() {
    background(0, 0, 0);

    CoordSystem.drawCoordinateSystem();

    window.requestAnimationFrame(draw);
}

