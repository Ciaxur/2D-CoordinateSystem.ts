"use strict";
/**
 * Coordinate System Main Class
 *
 * Features:
 *  Handles Coordinate System Drawing using the Canvas API
 *  Keeps track of the Matricies & Vectors
 *  Draws System based on axis Minimums and Maximums
 *
 * Restrictions:
 *  Only works in a 2D Plane
 */
class CoordinateSystem {
    // METHODS
    /** Main Constructor Method
     *
     *  Assign Data Value
     * @param coordWidth The Width of the Coordinate System
     * @param coordHeight The Height of the Coordinate System
     * @param resolution The Spacing Resolution between the axies
     */
    constructor(coordWidth, coordHeight, resolution) {
        // Set Default Values
        this.x = this.y = this.theta = this.magnitude = 0;
        this.triWidth = 5;
        this.triHeight = 1;
        // Setup Coordinate System Dimensions
        this.coordHeight = coordHeight;
        this.coordWidth = coordWidth;
        this.spacing = resolution === undefined ? 40 : resolution;
    }
    /** Draws Coordinate System */
    drawCoordinateSystem() {
        const midX = Math.floor(this.coordWidth / 2);
        const midY = Math.floor(this.coordHeight / 2);
        ctx.save();
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.lineWidth = 1.5;
        // Draw x-axis
        ctx.beginPath();
        ctx.lineTo(midX, this.coordHeight);
        ctx.lineTo(midX, 0);
        ctx.stroke();
        ctx.closePath();
        // Draw y-axis
        ctx.beginPath();
        ctx.lineTo(0, midY);
        ctx.lineTo(this.coordWidth, midY);
        ctx.stroke();
        ctx.closePath();
        // Change Properties
        ctx.strokeStyle = "rgb(255,255,255, 0.2)";
        ctx.lineWidth = 0.2;
        // Draw x-axis (Right-Side) Dashes
        for (let x = midX; x < this.coordWidth; x += this.spacing) {
            ctx.beginPath();
            ctx.lineTo(x, this.coordHeight);
            ctx.lineTo(x, 0);
            ctx.stroke();
            ctx.closePath();
        }
        // (Left-Side) Dashes
        for (let x = midX; x > 0; x -= this.spacing) {
            ctx.beginPath();
            ctx.lineTo(x, this.coordHeight);
            ctx.lineTo(x, 0);
            ctx.stroke();
            ctx.closePath();
        }
        // Draw y-axis (Up-Side) Dashes
        for (let y = midY; y > 0; y -= this.spacing) {
            ctx.beginPath();
            ctx.lineTo(0, y);
            ctx.lineTo(this.coordWidth, y);
            ctx.stroke();
            ctx.closePath();
        }
        // Draw y-axis (Down-Side) Dashes
        for (let y = midY; y < this.coordHeight; y += this.spacing) {
            ctx.beginPath();
            ctx.lineTo(0, y);
            ctx.lineTo(this.coordWidth, y);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
        // Draw the Vectors on top of the Coordinate System
        this.drawVectors(midX, midY);
    }
    /** Resize Coordinate System
     *
     * @param newWidth The Width of the Coordinate System
     * @param newHeight The Height of the Coordinate System
     */
    resize(newWidth, newHeight) {
        this.coordWidth = newWidth;
        this.coordHeight = newHeight;
    }
    /** Adds a Vector to the System
     *
     * @param x The x-axis Value of the Vector
     * @param y The y-axis Value of the Vector
     */
    addVector(x, y) {
        // Check / Assign Vector
        this.x = x;
        this.y = y;
        // Calculate Magnitude Data
        this.magnitude = CoordinateSystem.calculateMagnitude(this.x, this.y);
        // Calculate Angle Data
        this.theta = CoordinateSystem.calculateAngle(this.x, this.y);
    }
    /** Sets Vector Pointer's Dimensions (Size)
     *
     * @param width The Width of the Triangle Pointer
     * @param height The Height of the Triangle Pointer
     */
    setPointerDim(width, height) {
        // Check for illegal dimension values
        if (width <= 0 || height <= 0) {
            console.error("Invalid Dimension Value! Only Positive Values are allowed!");
            return;
        }
        // Set Triangle Dimensions
        this.triWidth = width;
        this.triHeight = height;
    }
    // PRIVATE METHODS
    /** Draw Vectors onto the Coordinate System
     *
     * @param originX The Origin X-Axis Point
     * @param originY The Origin Y-Axis Point
     */
    drawVectors(originX, originY) {
        // START DRAWING
        ctx.save();
        ctx.strokeStyle = "rgb(0, 200, 0)";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // DRAW VECTOR LINE
        const x = originX + (this.x * this.spacing);
        const y = originY - (this.y * this.spacing);
        ctx.lineTo(originX, originY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        // DRAW POINTER TRIANGLE
        const tX1 = originX + (((this.magnitude - this.triHeight) * Math.cos(this.theta)) * this.spacing);
        const tY1 = originY - (((this.magnitude - this.triHeight) * Math.sin(this.theta)) * this.spacing);
        const tX2 = tX1 + (this.triWidth * Math.cos(this.theta + (Math.PI / 2)));
        const tY2 = tY1 - (this.triWidth * Math.sin(this.theta + (Math.PI / 2)));
        const tX3 = tX1 + (this.triWidth * Math.cos(this.theta - (Math.PI / 2)));
        const tY3 = tY1 - (this.triWidth * Math.sin(this.theta - (Math.PI / 2)));
        ctx.beginPath();
        ctx.lineTo(tX1, tY1);
        ctx.lineTo(tX2, tY2);
        ctx.lineTo(x, y);
        ctx.lineTo(tX3, tY3);
        ctx.lineTo(tX1, tY1);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    // STATIC METHODS
    /** Calculates the Magnitude of the Vector
     *
     * @param x The x-axis Vector point
     * @param y The y-axis Vector point
     * @returns The Magnitude Result of the 2D Vector
     */
    static calculateMagnitude(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    /** Calculates the angle (in radians) of Given 2D Vector
     *
     * @param x The x-axis Vector point
     * @param y The y-axis Vector point
     * @returns The Angle Result of the 2D Vector
     */
    static calculateAngle(x, y) {
        // Check if Vector on Left Side
        if (x < 0) {
            return Math.atan(y / x) - Math.PI;
        }
        return Math.atan(y / x);
    }
}
//# sourceMappingURL=CoordinateSystem.js.map