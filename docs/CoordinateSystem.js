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
        // Set Default Data Values
        this.vectorData = [];
        this.pointsData = [];
        this.polynomialData = [];
        // Setup Triangle Default Properties
        this.triWidth = 5;
        this.triHeight = 1;
        // Setup Coordinate System Dimensions
        this.coordHeight = coordHeight;
        this.coordWidth = coordWidth;
        this.spacing = resolution === undefined ? 40 : resolution;
        // Setup Identity Matrix of System Dimensions
        this.originX = Math.floor(this.coordWidth / 2);
        this.originY = Math.floor(this.coordHeight / 2);
    }
    /** Draws Coordinate System */
    drawCoordinateSystem() {
        // Start Drawing
        ctx.save();
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.lineWidth = 1.5;
        // Draw x-axis
        ctx.beginPath();
        ctx.lineTo(this.originX, this.coordHeight);
        ctx.lineTo(this.originX, 0);
        ctx.stroke();
        ctx.closePath();
        // Draw y-axis
        ctx.beginPath();
        ctx.lineTo(0, this.originY);
        ctx.lineTo(this.coordWidth, this.originY);
        ctx.stroke();
        ctx.closePath();
        // Change Properties
        ctx.strokeStyle = "rgb(255,255,255, 0.2)";
        ctx.lineWidth = 0.2;
        // Draw x-axis (Right-Side) Dashes
        for (let x = this.originX; x < this.coordWidth; x += this.spacing) {
            ctx.beginPath();
            ctx.lineTo(x, this.coordHeight);
            ctx.lineTo(x, 0);
            ctx.stroke();
            ctx.closePath();
        }
        // (Left-Side) Dashes
        for (let x = this.originX; x > 0; x -= this.spacing) {
            ctx.beginPath();
            ctx.lineTo(x, this.coordHeight);
            ctx.lineTo(x, 0);
            ctx.stroke();
            ctx.closePath();
        }
        // Draw y-axis (Up-Side) Dashes
        for (let y = this.originY; y > 0; y -= this.spacing) {
            ctx.beginPath();
            ctx.lineTo(0, y);
            ctx.lineTo(this.coordWidth, y);
            ctx.stroke();
            ctx.closePath();
        }
        // Draw y-axis (Down-Side) Dashes
        for (let y = this.originY; y < this.coordHeight; y += this.spacing) {
            ctx.beginPath();
            ctx.lineTo(0, y);
            ctx.lineTo(this.coordWidth, y);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
        // DRAW ALL DATA
        if (this.vectorData.length)
            this.drawVectors();
        if (this.pointsData.length)
            this.drawPoints();
        if (this.polynomialData.length)
            this.drawPolynomials();
    }
    /** Resize Coordinate System
     *
     * @param newWidth The Width of the Coordinate System
     * @param newHeight The Height of the Coordinate System
     */
    resize(newWidth, newHeight) {
        this.coordWidth = newWidth;
        this.coordHeight = newHeight;
        // Update Origin Value
        this.originX = Math.floor(this.coordWidth / 2);
        this.originY = Math.floor(this.coordHeight / 2);
    }
    /** Adds a Vector to the System | Matrix Object of Dimension m*2
     *
     * @param x The x-axis Value of the Vector or a Matrix Object
     * @param y The y-axis Value of the Vector
     */
    addVector(x, y) {
        // Add to Vector Data
        this.add_Mx2(x, y, "vector");
    }
    /** Adds a Point to the System | Matrix Object of Dimension m*2
     *
     * @param x The x-axis Value of the Point or a Matrix Object
     * @param y The y-axis Value of the Point
     */
    addPoint(x, y) {
        // Add to Points Data
        this.add_Mx2(x, y, "point");
    }
    /** Adds a Polynomial to the System | Matrix Object of Dimension m*2
     *
     * @param m The m Value of the Polynomial "m" (mx + b) or a Matrix Object for [a, b, c, ...] for polynomial (ex. ax^2 + bx + c)
     * @param b The y Value of the Polynomial "b" | (mx + b)
     */
    addPolynomial(m, b) {
        // Adjust Matrix Polynomial Data
        if (m instanceof Matrix) {
            // Make sure only (mx1) or (1xn) Shapes ALLOWED
            if (m.getColumns() !== 1 && m.getRows() !== 1) {
                console.error("Polynomial Error - Invalid Matrix Shape! Only mx1 or 1xn Shapes Accepted!");
            }
            // Add to Data if Valid Shape
            else {
                // Check if (1xn) to Transpose it
                if (m.getRows() !== 1) {
                    m.transpose();
                }
                this.polynomialData.push(m);
            }
        }
        // Add to Linear Data
        else {
            this.add_Mx2(m, b, "polynomial");
        }
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
    /** Resets All data | Removes all data */
    reset() {
        this.vectorData = [];
        this.pointsData = [];
        this.polynomialData = [];
    }
    /** Clears all Vector Data */
    clearVectors() {
        this.vectorData = [];
    }
    /** Clears all Points Data */
    clearPoints() {
        this.pointsData = [];
    }
    /** Clears all Polynomial Data */
    clearPolynomial() {
        this.polynomialData = [];
    }
    /** Draw the Projection Matrix onto Coordinate System
     * @param projMatrix Projection Matrix (Matrix Object) of Dimensions [2,2]
     */
    drawProjectionMatrix(mat) {
        // Check if Projection Matrix is Valid
        if (!this.checkProjectionMatrix(mat)) {
            console.error("Projection Matrix Invalid: Invalid mat Parameter, NOT a Projection Matrix!");
            return;
        }
        // Create the Vectors Along the X-Axis
        const vec1 = Matrix.fromArray([[this.coordHeight, 0]]);
        const vec2 = Matrix.fromArray([[-this.coordHeight, 0]]);
        // Get the Result of Projecting onto the Projection Matrix
        const res1 = this.dotMat2(mat, vec1);
        const res2 = this.dotMat2(mat, vec2);
        // Display
        this.addVector(res1);
        this.addVector(res2);
    }
    /** Draws the Shadow Projected from the vector onto a Projection Matrix
     *
     * @param matrixProjection The Projection Matrix
     * @param vec The Vector that will be applied to the Projection Matrix
     */
    drawProjectionFromVec(matrixProjection, vec) {
        // Check if Projection Matrix is Valid
        if (!this.checkProjectionMatrix(matrixProjection)) {
            console.error("Projection Matrix Invalid: Invalid mat Parameter, NOT a Projection Matrix!");
            return;
        }
        // Get the Shadow Projected onto Matrix
        const vecShadow = this.dotMat2(matrixProjection, vec);
        // Add to the Coordinate Plane
        this.addVector(vecShadow);
    }
    /** Draws Best Fit Linear Polynomoial to Points
     *
     * @param pointsArr The Points 2D Array
     */
    drawBestFitLinear(pointsArr) {
        // Ax = b
        const Aarr = []; // A Data Array for Matrix
        const Barr = []; // B Data Array for Matrix
        // Get the Data
        for (const point of pointsArr) {
            Aarr.push([point[0], 1]); // Push the Coefficient of m and b
            Barr.push(point[1]); // Push the 'y' value (mx + b = y)
        }
        // Construct the Matricies & Calculate Data
        const A = new Matrix(Aarr);
        const At = Matrix.transpose(A);
        const AtA = Matrix.multiply(At, A);
        const AtAinv = Matrix.invert2x2(AtA);
        const B = new Matrix(Barr);
        const AtB = Matrix.multiply(At, B);
        const x = Matrix.multiply(AtAinv, AtB);
        // Construct the mx + b Polynomial
        const m = x.dataCopy()[0];
        const b = x.dataCopy()[1];
        // Draw Polynomial
        this.addPolynomial(m, b);
    }
    /** @returns Points Data as Array */
    getPointsArr() {
        // Append Data to arr
        const arr = [];
        for (const m of this.pointsData) {
            arr.push(m.dataCopy()[0]); // Deep Copy the Data
        }
        // Return Result
        return arr;
    }
    // PRIVATE METHODS
    /** Returns a 2D Rotational Matrix
     * @param angle The Angle (in Radians) to rotate by
     * @returns 2D Rotational Matrix
     */
    getRotationMatrix(angle) {
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        return Matrix.fromArray([
            [x, y],
            [-y, x]
        ]);
    }
    /** Performs the Dot Product on a 2x2 Matrix by a 1x2 Vector
     *
     * @param mat A 2x2 Matrix Object
     * @param vec A 1x2 Matrix Object (Vector)
     * @returns Matrix Object Result of Dot Product (1x2 Matrix Vector)
     */
    dotMat2(mat, vec) {
        // Test Dimensions
        if (mat.getColumns() !== 2 || mat.getRows() !== 2) {
            console.error(new Error("Invalid Matrix Dimensions: mat Parameter has to be a 2x2 Matrix!"));
            return null;
        }
        if (vec.getColumns() !== 2 || vec.getRows() !== 1) {
            console.error(new Error("Invalid Matrix Dimensions: vec Parameter has to be a 1x2 Matrix!"));
            return null;
        }
        // Perform the Dot Product
        const matArr = mat.dataCopy();
        const vecArr = (vec.dataCopy()[0]);
        let x = (matArr[0][0] * vecArr[0]) + (matArr[0][1] * vecArr[1]);
        let y = (matArr[1][0] * vecArr[0]) + (matArr[1][1] * vecArr[1]);
        // Return Result 2D Vector (1x2)
        return Matrix.fromArray([[x, y]]);
    }
    /** Draw all Vectors onto the Coordinate System */
    drawVectors() {
        for (const m of this.vectorData) { // Get all Matrix Objects
            for (const vec of m.data) { // Break down all the Vectors inside each Object
                // START DRAWING
                ctx.save();
                ctx.strokeStyle = "rgb(0, 200, 0)";
                ctx.fillStyle = ctx.strokeStyle;
                ctx.lineWidth = 2;
                ctx.beginPath();
                // DRAW VECTOR LINE
                const x = this.originX + (vec[0] * this.spacing);
                const y = this.originY - (vec[1] * this.spacing);
                const magnitude = CoordinateSystem.calculateMagnitude(vec[0], vec[1]);
                const theta = CoordinateSystem.calculateAngle(vec[0], vec[1]);
                ctx.lineTo(this.originX, this.originY);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.closePath();
                // DRAW POINTER TRIANGLE
                const tX1 = this.originX + (((magnitude - this.triHeight) * Math.cos(theta)) * this.spacing);
                const tY1 = this.originY - (((magnitude - this.triHeight) * Math.sin(theta)) * this.spacing);
                const tX2 = tX1 + (this.triWidth * Math.cos(theta + (Math.PI / 2)));
                const tY2 = tY1 - (this.triWidth * Math.sin(theta + (Math.PI / 2)));
                const tX3 = tX1 + (this.triWidth * Math.cos(theta - (Math.PI / 2)));
                const tY3 = tY1 - (this.triWidth * Math.sin(theta - (Math.PI / 2)));
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
        }
    }
    /** Draw all Points as Circle onto the Coordinate System */
    drawPoints() {
        for (const m of this.pointsData) { // Get all Matrix Objects
            for (const vec of m.data) { // Break down all the Vectors inside each Object
                // Create Variables (For Readability)
                const x = this.originX + (vec[0] * this.spacing);
                const y = this.originY - (vec[1] * this.spacing);
                const r = 4;
                // START DRAWING
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = "rgb(0, 255, 0)";
                ctx.ellipse(x, y, r, r, 1, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }
        }
    }
    /** Draws all Polynomials onto Coordiante System */
    drawPolynomials() {
        // Variables used
        const maxX = Math.floor(this.coordWidth / this.spacing) / 2;
        // POLY DATA
        for (const polyData of this.polynomialData) { // Get all Matrix Objects
            for (const vec of polyData.data) { // Break down all the Vectors inside each Object
                // Start Drawing Path
                ctx.save();
                ctx.beginPath();
                // Setup Properties
                ctx.strokeStyle = "rgb(0, 255, 0)";
                // To Save Time, check if vec is only 2 (Linear = mx + b)
                if (vec.length === 2) {
                    const m = vec[0];
                    const b = vec[1];
                    const x1 = this.adjustToOrigin(maxX, false);
                    const y1 = this.adjustToOrigin(m * maxX + b, true);
                    const x2 = this.adjustToOrigin(-maxX, false);
                    const y2 = this.adjustToOrigin(m * (-maxX) + b, true);
                    ;
                    ctx.lineTo(x1, y1);
                    ctx.lineTo(x2, y2);
                }
                // Organize & Draw the Polynomial
                else {
                    for (let i = -maxX; i < maxX; i += 0.1) {
                        const result = CoordinateSystem.solvePolynomialY(i, vec);
                        const y = this.adjustToOrigin(result, true);
                        const x = this.adjustToOrigin(i, false);
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
    }
    /** Checks if Matrix is a Valid 2D Projection Matrix
     *
     * @param projMatrix Matrix that will be tested if is Valid Projection Matrix (2x2 Matrix)
     */
    checkProjectionMatrix(mat) {
        // Check if Matrix is Valid
        if (mat.getColumns() !== 2 || mat.getRows() !== 2) {
            console.error("Invalid Dimensions: mat Parameter has to be a 2x2 Matrix");
            return false;
        }
        // Matrix Multiply mat * mat to check if it equals mat
        const matArr = mat.data;
        // Manual Checks
        // 0,0
        if ((matArr[0][0] * matArr[0][0]) + (matArr[0][1] * matArr[1][0]) !== matArr[0][0])
            return false;
        // 0,1
        else if ((matArr[0][0] * matArr[0][1]) + (matArr[0][1] * matArr[1][1]) !== matArr[0][1])
            return false;
        // 1,0
        else if ((matArr[1][0] * matArr[0][0]) + (matArr[1][1] * matArr[1][0]) !== matArr[1][0])
            return false;
        // 1,1
        else if ((matArr[1][0] * matArr[0][1]) + (matArr[1][1] * matArr[1][1]) !== matArr[1][1])
            return false;
        // Debug Check
        // console.log((matArr[0][0] * matArr[0][0]) + (matArr[0][1] * matArr[1][0]), (matArr[0][0] * matArr[0][1]) + (matArr[0][1] * matArr[1][1]));
        // console.log((matArr[1][0] * matArr[0][0]) + (matArr[1][1] * matArr[1][0]), (matArr[1][0] * matArr[0][1]) + (matArr[1][1] * matArr[1][1]));
        return true;
    }
    /** Adds a mx2 or 1xn Matrix to it's Data depending on given Type
     *
     * @param x The x-axis Value | Matrix Object
     * @param y The y-axis Value
     * @param dataType Data Type that the Matrix will be added/created to
     */
    add_Mx2(x, y, dataType) {
        // Check if Matrix Object
        if (x instanceof Matrix) {
            // Check if m*2 Matrix
            if (x.getColumns() !== 2 && x.getRows() !== 2) {
                console.error("Invalid Matrix Dimensions! Only m by 2 Matricies are allowed!");
                return;
            }
            // Transpose from [2,n] to [n,2]
            if (x.getColumns() !== 2) {
                x.transpose();
            }
            // Push Data Depending on Type
            if (dataType === "vector")
                this.vectorData.push(x);
            else if (dataType === "point")
                this.pointsData.push(x);
            else if (dataType === "polynomial")
                this.polynomialData.push(x); // mx2 | Added here prior
        }
        // Create a Matrix Object with Set Values
        else {
            // Create Data Depending on Type
            if (dataType === "vector")
                this.vectorData.push(Matrix.fromArray([[x, y]]));
            else if (dataType === "point")
                this.pointsData.push(Matrix.fromArray([[x, y]]));
            else if (dataType === "polynomial")
                this.polynomialData.push(Matrix.fromArray([[x, y]])); // Plynomial: Simple Linear
        }
    }
    /** Draws a Circle with radius "5" at given Coordinates
     *
     * @param x X-Axis Coordinate Point
     * @param y Y-Axis Coordinate Point
     */
    drawCirc(x, y) {
        // Adjust Values to Origin
        x = this.adjustToOrigin(x, false);
        y = this.adjustToOrigin(y, true);
        // Draw
        ctx.save();
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.beginPath();
        ctx.ellipse(x, y, 5, 5, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    /** Adjusts value Relative to Origin
     *
     * @param n The Value to Adjust
     * @param isY Boolean stating if Value is for Y-Axis or not
     */
    adjustToOrigin(n, isY) {
        return isY
            ? this.originY - (n * this.spacing)
            : this.originX + (n * this.spacing);
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
    /** Solves for any Polynomial for "y"
     *
     * @param x The x Varaible that will be multiplied by the polynomial
     * @param polyArr The Polynomial Array for Value of each "Increase in Power" [1,2,3] -> [1x^2, 2x, 3] -> 1x^2 + 2x + 3
     */
    static solvePolynomialY(x, polyArr) {
        // Variables used
        let y = polyArr[polyArr.length - 1]; // Y-Initial Set to the last Element (Since not mult. by X)
        let power = 1; // Initial Power set to power of 1
        // Go through all Polynomial Values
        for (let i = polyArr.length - 2; i >= 0; i--) {
            y += polyArr[i] * Math.pow(x, power++); // Accumulate the Caculation of x^power * Value
        }
        // Return y Result
        return y;
    }
}
//# sourceMappingURL=CoordinateSystem.js.map