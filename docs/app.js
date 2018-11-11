"use strict";
// Global Varialbes
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let WIDTH = 0;
let HEIGHT = 0;
let CoordSystem;
let CoordMenu;
// On Load
document.addEventListener("DOMContentLoaded", () => {
    // Add Canvas to Document
    document.body.appendChild(canvas);
    // Set Properties
    canvas.width = WIDTH = window.innerWidth;
    canvas.height = HEIGHT = window.innerHeight;
    // Setup Coordinate System
    CoordSystem = new CoordinateSystem(WIDTH, HEIGHT, 10);
    CoordSystem.addVector(10, 10);
    // Setup Main Menu for Coordinate System
    CoordMenu = new Menu(CoordSystem, ctx);
    // Adding a Matrix Object of m by 2 Dimensions
    CoordSystem.addVector(Matrix.fromArray([
        [8, 5],
        [-10, -10],
        [-6, 15],
        [20, -15]
    ]));
    // Add Mouse Clicked Event after Setting Up
    window.addEventListener("click", mouseClickAction);
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
function background(r, g, b) {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}
function draw() {
    background(0, 0, 0);
    // Draw the Coordinate System
    CoordSystem.drawCoordinateSystem();
    // Draw the Menu ontop of the Coordinate System
    CoordMenu.start();
    window.requestAnimationFrame(draw);
}
/** Function call when Mouse click Event */
function mouseClickAction(e) {
    // Menu Button Data
    const menuBtnPos = CoordMenu.getButtonPosition();
    const btnShape = CoordMenu.getButtonShape();
    // Close Menu Button Data
    const closeBtnPos = CoordMenu.getCloseMenuBtnPosition();
    const closeBtnShape = CoordMenu.getCloseMenuBtnShape();
    // Mouse Data
    const mousePos = {
        x: e.x, y: e.y
    };
    // Menu Button vs Mouse
    // Check if Mouse within Menu Button Click | Trigger Menu
    if (Menu.within(menuBtnPos, btnShape, mousePos) && !CoordMenu.getMenuStatus()) {
        CoordMenu.triggerMenu();
    }
    // Menu Box vs Mouse
    // Check if Mouse within Menu Buttons
    // Check if Mouse within Close Menu Button
    else {
        // Check Close Button
        if (Menu.within(closeBtnPos, closeBtnShape, mousePos)) {
            CoordMenu.triggerMenu();
        }
        // Check Menu Buttons
        CoordMenu.clickedButton(mousePos);
    }
}
//# sourceMappingURL=app.js.map