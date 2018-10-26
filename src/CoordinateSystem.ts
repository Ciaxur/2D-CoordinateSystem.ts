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
// PRIVATE DATA
    private data: Matrix[];

    // COORDINATE PROPERTIES
    private coordWidth: number;
    private coordHeight: number;
    private spacing;

    // POINTER PROPERTIES
    private triWidth: number;
    private triHeight: number;
    
// METHODS
    /** Main Constructor Method
     * 
     *  Assign Data Value
     * @param coordWidth The Width of the Coordinate System
     * @param coordHeight The Height of the Coordinate System
     * @param resolution The Spacing Resolution between the axies
     */
    constructor(coordWidth: number, coordHeight: number, resolution?: number) {
        // Set Default Values
        this.data = [];
        this.triWidth = 5;
        this.triHeight = 1;

        // Setup Coordinate System Dimensions
        this.coordHeight = coordHeight;
        this.coordWidth = coordWidth;
        this.spacing = resolution === undefined ? 40 : resolution;
    }

    /** Draws Coordinate System */
    public drawCoordinateSystem(): void {
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
        for (const m of this.data) {        // Get all Matrix Objects
            for (const vec of m.data) {     // Break down all the Vectors inside each Object
                // Draw Each Vector
                this.drawVectors(midX, midY, (vec as number[]));
            }
        }
    }

    /** Resize Coordinate System
     * 
     * @param newWidth The Width of the Coordinate System
     * @param newHeight The Height of the Coordinate System
     */
    public resize(newWidth: number, newHeight: number): void {
        this.coordWidth = newWidth;
        this.coordHeight = newHeight;
    }

    /** Adds a Vector to the System | Matrix Object of Dimension m*2
     * 
     * @param x The x-axis Value of the Vector or a Matrix Object
     * @param y The y-axis Value of the Vector
     */
    public addVector(x: number | Matrix, y?: number): void {
        // Check if Matrix Object
        if (x instanceof Matrix) {
            // Check if m*2 Matrix
            if (x.getColumns() !== 2 && x.getRows() !== 2) {
                console.error("Invalid Matrix Dimensions! Only m by 2 Matricies are allowed!");
                return;
            }

            // Transpose from [2,1] to [1,2]
            if (x.getColumns() !== 2) {
                x.transpose();
            }

            this.data.push(x);
        }

        // Create a Matrix Object with Set Values
        else {
            const m = new Matrix(1, 2);
            y = y !== undefined ? y : 0;
            m.set([[x, y]]);
            
            this.data.push(m);
        }
    }

    /** Sets Vector Pointer's Dimensions (Size)
     * 
     * @param width The Width of the Triangle Pointer
     * @param height The Height of the Triangle Pointer
     */
    public setPointerDim(width: number, height: number): void {
        // Check for illegal dimension values
        if (width <= 0 || height <= 0) {
            console.error("Invalid Dimension Value! Only Positive Values are allowed!");
            return; 
        }
        
        // Set Triangle Dimensions
        this.triWidth = width;
        this.triHeight = height;
    }

    /** Resets Vector data | Removes all data */
    public reset(): void {
        this.data = [];
    }

    /** Draw the Projection Matrix onto Coordinate System
     * @param projMatrix Projection Matrix (Matrix Object) of Dimensions [2,2]
     */
    public showProjectionMatrix(mat: Matrix): void {
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
    public drawProjectionFromVec(matrixProjection: Matrix, vec: Matrix): void {
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


// PRIVATE METHODS
    /** Returns a 2D Rotational Matrix
     * @param angle The Angle (in Radians) to rotate by
     * @returns 2D Rotational Matrix
     */
    private getRotationMatrix(angle: number): Matrix {
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        
        return Matrix.fromArray([
            [ x, y],
            [-y, x]
        ]);
    }
    
    /** Performs the Dot Product on a 2x2 Matrix by a 1x2 Vector
     * 
     * @param mat A 2x2 Matrix Object
     * @param vec A 1x2 Matrix Object (Vector)
     * @returns Matrix Object Result of Dot Product (1x2 Matrix Vector)
     */
    private dotMat2(mat: Matrix, vec: Matrix): Matrix {
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
        const matArr: number[][] = mat.dataCopy() as number[][];
        const vecArr: number[] = (vec.dataCopy()[0]) as number[];

        let x = (matArr[0][0] * vecArr[0]) + (matArr[0][1] * vecArr[1]);
        let y = (matArr[1][0] * vecArr[0]) + (matArr[1][1] * vecArr[1]);

        // Return Result 2D Vector (1x2)
        return Matrix.fromArray([[x, y]]);
    }

    /** Draw Vectors onto the Coordinate System
     * 
     * @param originX The Origin X-Axis Point
     * @param originY The Origin Y-Axis Point
     * @param vec 2DVector Array to Draw
     */
    private drawVectors(originX: number, originY: number, vec: number[]): void {
        // START DRAWING
        ctx.save();
        ctx.strokeStyle = "rgb(0, 200, 0)";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = 2;

        ctx.beginPath();

        // DRAW VECTOR LINE
        const x = originX + (vec[0] * this.spacing);
        const y = originY - (vec[1] * this.spacing);
        const magnitude = CoordinateSystem.calculateMagnitude(vec[0], vec[1]);
        const theta = CoordinateSystem.calculateAngle(vec[0], vec[1]);

        ctx.lineTo(originX, originY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.closePath();


        
        // DRAW POINTER TRIANGLE
        const tX1 = originX + (((magnitude - this.triHeight) * Math.cos(theta)) * this.spacing);
        const tY1 = originY - (((magnitude - this.triHeight) * Math.sin(theta)) * this.spacing);

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

    /** Checks if Matrix is a Valid 2D Projection Matrix
     * 
     * @param projMatrix Matrix that will be tested if is Valid Projection Matrix (2x2 Matrix)
     */
    private checkProjectionMatrix(mat: Matrix): Boolean {
        // Check if Matrix is Valid
        if (mat.getColumns() !== 2 || mat.getRows() !== 2) {
            console.error("Invalid Dimensions: mat Parameter has to be a 2x2 Matrix");
            return false;
        }
        
        // Matrix Multiply mat * mat to check if it equals mat
        const matArr: number[][] = mat.data as number[][];
        
        // Manual Checks
        // 0,0
        if ((matArr[0][0] * matArr[0][0]) + (matArr[0][1] * matArr[1][0]) !== matArr[0][0]) return false;

        // 0,1
        else if ((matArr[0][0] * matArr[0][1]) + (matArr[0][1] * matArr[1][1]) !== matArr[0][1]) return false;

        // 1,0
        else if ((matArr[1][0] * matArr[0][0]) + (matArr[1][1] * matArr[1][0]) !== matArr[1][0]) return false;

        // 1,1
        else if ((matArr[1][0] * matArr[0][1]) + (matArr[1][1] * matArr[1][1]) !== matArr[1][1]) return false;

        
        // Debug Check
        // console.log((matArr[0][0] * matArr[0][0]) + (matArr[0][1] * matArr[1][0]), (matArr[0][0] * matArr[0][1]) + (matArr[0][1] * matArr[1][1]));
        // console.log((matArr[1][0] * matArr[0][0]) + (matArr[1][1] * matArr[1][0]), (matArr[1][0] * matArr[0][1]) + (matArr[1][1] * matArr[1][1]));
        
        return true;
    }


// STATIC METHODS
    /** Calculates the Magnitude of the Vector
     * 
     * @param x The x-axis Vector point
     * @param y The y-axis Vector point
     * @returns The Magnitude Result of the 2D Vector
     */
    public static calculateMagnitude(x: number, y: number): number {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    /** Calculates the angle (in radians) of Given 2D Vector
     * 
     * @param x The x-axis Vector point
     * @param y The y-axis Vector point
     * @returns The Angle Result of the 2D Vector
     */
    public static calculateAngle(x: number, y: number): number {
        // Check if Vector on Left Side
        if (x < 0) {
            return Math.atan(y / x) - Math.PI;
        }
        return Math.atan(y / x);
    }
}