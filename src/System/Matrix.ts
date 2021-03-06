/**
 * Author:          Omar Omar
 * Date:            June 20, 2018
 * Last Modified:   Oct 30, 2018
 * 
 *  1D / 2D Matrix Class Library
 *  Matrix Common Errors Class
 * 
 *  Primary use for the Neural Network class for Learning and Self-Educating.
 *  This Library was inspired by Daniel Shiffman from his "Neural Network Youtube Playlist Tutorials"
 * 
 *  Properties:
 *      2D Matrix
 *      Linear Algebra Calculations.
 *      Matrix Calculations
 */




/** Abstract Class that Validates Common Errors from the Matrix Class
 * 
 * 
 */
abstract class MatrixError {

    /** Checks the Type Consistency throughout an array 
     * @param arr An Array of Elements
     * @param type The type that each Element in the Array should be (Array<string> or string)
     * 
     * @throws Exeption if any of the element types don't match type
     */
    protected ConsistantType(arr: Array<any>, type: string | string[]): void{
        // Check if Array is Empty
        if (arr.length === 0) {
            throw (new Error("Invalid Array: Empty Array!"));
        }
        
        // Validate Element Types
        for (const e of arr) {
            // Multiple Types to check
            if (type instanceof Array) {
                let errorsLeft = type.length;      // The total number of error "health"

                for (const t of type) {
                    if (typeof (e) !== t) {
                        errorsLeft--;
                    }
                }

                // Throw Error if no more types "errors" left (if ALL types failed)
                if (!errorsLeft) {
                    throw (new Error(`Invalid Type: Array must have Elements of type [${type.toString()}]!`));
                }
            }

            // Single Type to check
            else {
                if (typeof (e) !== type) {
                    throw(new Error(`Invalid Type: Array must have Elements of type ${type}!`));
                }
            }

            
        }
    }


    /** Validates a 2D Array and other optional Validations throughout
     * @param arr A 2D Array
     * @param type Consistant Array Element Types (Optional)
     * @param sameLength Boolean to check for Consistant Length of Sub-Array (Optional)
     * 
     * @throws Exeption if not 2D Array
     * @throws Exeption if Inconsistant Element Types
     * @throws Exeption if Inconsistant Sub-Array Length
     * 
     * @returns Number of Columns in the Array | undefined if 'sameLength' is undefined
     */
    protected Validate2DArray(arr: Array<any> | Array< Array<any> >, type?: string, sameLength?: boolean): number {
        // Variable Initiation
        let cols;   // Keeps track of the highest Length in the Sub-Array
        
        // Loop through Each Element in the Array
        for (const e of arr) {
            // Make sure each element IS an Array (2D Array Validation)
            if (e instanceof Array) {
                // Check if Consistant Length IF Optional Param
                if (sameLength) {
                    // Check if Column Length are consistant
                    // Throw Error: Inconsistant Size
                    if (cols !== undefined && cols !== e.length) {
                        throw(new Error("Invalid Size: Each Column has to have the same length!"));
                    }
    
                    // Set the Columns
                    cols = e.length;
                }
            }

            // Throw Error: Invalid Element Type
            else {
                throw(new Error("Invalid Type: Each Element has to be of type Array!"));
            }


            // Check if (optional) Type param
            if (type) {
                // Check if each Element has the same type
                // Throw Error: Invalid Element Type
                for (const subE of e) {
                    if (typeof (subE) !== type) {
                        throw(new Error(`Invalid Type: Each Column value should be of type ${type}!`));
                    }
                }
            }
        }

        return cols;
    }
}



/** Matrix Class that Calculates simple Matrix Operations used for Neural Networks */
class Matrix extends MatrixError {
    // Class Variables
    private rows:       number;                     // Rows of the Matrix
    private columns:    number;                     // Columns of the Matrix
    public  shape:      string;                     // The Shape of the 2D Matrix String -> [Rows,Columns]
    public  data:       number[][] | number[];      // The Matrix Itself (2D Array)
    
    /** Constructs the Basics of the Matrix
     * @constructor Initiates the Matrix Rows and Columns
     * @param rows The Total Matrix Rows | Array that is converted to Matrix Object
     * @param columns The Total Matrix Columns
     */
    constructor(rows?: number | number[], columns?: number) {
        // Call Parent Constructor
        super();

        // Assign the rows & columns
        if (!(rows instanceof Array)) {
            this.rows       = (rows !== undefined)      ? rows : 0;     // Assign to rows or 0 if undefined
            this.columns    = (columns !== undefined)   ? columns : 0;  // Assign to columns or 0 if undefined

            // Initiate Properties by "reseting" them
            this.reset();
        }
        
        // Assign Data from Array
        else {
            this.set(Matrix.fromArray(rows).data);
        }
    }


    /** Console Logs the Table Matrix */
    public print(): void {
        console.table(this.data);
    }


    /** Adds a Scalar or another Matrix to Current Data
     * Matrix Objects require Identical Shapes
     * @param n A Scalar Number or another Matrix Object
     */
    public add(n: any): void {
        // Matrix Addition
        if (n instanceof Matrix) { 
            // Accumulate each Corresponding Value 
            if (n.shape === this.shape) {
                this.map((val, x, y) => val + n.data[x][y]);
            }

            // Verify Dimensions
            else {
                console.error(new Error("Matrix Addition requires indentical Dimensions"));
            }
        }

        // Scalar Addition
        else if(typeof(n) === "number") {
            this.map(val => val + n);
        }

        // Throw Error if Neither
        else {
            console.error(new Error("Invalid Parameter!"));
        }
    }
    
    
    /** Subtracts a Scalar or another Matrix to Current Data
     * Matrix Objects require Identical Shapes
     * @param n A Scalar Number or another Matrix Object
     */
    public sub(n: any): void {
        // Matrix Subtraction
        if (n instanceof Matrix) { 
            // Accumulate each Corresponding Value 
            if (n.shape === this.shape) {
                this.map((val, x, y) => val - n.data[x][y]);
            }

            // Verify Dimensions
            else {
                console.error(new Error("Matrix Subtraction requires indentical Dimensions"));
            }
        }

        // Scalar Subtraction
        else if(typeof(n) === "number") {
            this.map(val => val - n);
        }

        // Throw Error if Neither
        else {
            console.error(new Error("Invalid Parameter!"));
        }
    }

     
    /** Multiplies a Scalar or another Matrix to Current Data
     * Preforms a Scalar Multiplication
     * @param n A Scalar or another Matrix Object
     */
    public multiply(n: Matrix | number): void {
        // Element-By-Element Product (Hadamard)
        if (n instanceof Matrix) {
            // Get the Result | Let "multiply" method handle errors
            const result = Matrix.multiply(this, n);

            // Check if result is not null
            if(result)
                this.set(result.data);
        }
        
        // Scalar Product
        else if (typeof (n) === "number") {
            this.map(val => val * n);
        }

        // Throw Error
        else {
            console.error(new Error("Invalid Parameter!"));
        }
    }
    
     
    /** Applies a Function to every element in the Matrix
     * Assigns each element to to a it's own value * the row index + column index 
     * 
     * @param fn Function with 1 Required Parameter and 2 Optional Parameters (Depending on the Dimensions of Matrix 1D/2D)
     * @returns Current Matrix (Mainly for the use of Chaining)
     * @example m.map((val, x) => val * x // 1D Mapping
     * @example m.map((val, x, y) => val * (x+y)) // 2D Mapping
     */
    public map(fn: Function): Matrix {
        // 1D Mapping
        if (this.columns === 1) {
            for (let x = 0; x < this.rows; x++){
                this.data[x] = fn(this.data[x], x);
            }
        }
        
        // 2D Mapping
        else {
            for (let x = 0; x < this.rows; x++) {
                for (let y = 0; y < this.columns; y++) {
                    this.data[x][y] = fn(this.data[x][y], x, y);
                }
            }
        }

        return this;
    }
    

    /** Sets a new Matrix
     * Matrix can be different than the current rows and columns. Rows and Columns will be updated
     * @param arr Matrix 1D / 2D Array that will be set the current
     */
    public set(arr: number[] | number[][]): Matrix {
        try {
            // Check if Each Element of the Array is a Number or an Object
            this.ConsistantType(arr, ["number", "object"]);
    
            // Check if 1D Array
            if (typeof (arr[0]) === "number") {
                // Make sure each element is consistant
                this.ConsistantType(arr, "number");

                // Eliminate Redundant Array Re-Creation
                if (this.rows !== arr.length || this.columns !== 1) {
                    // Set new Dimensions
                    this.rows = arr.length;
                    this.columns = 1;

                    // Reset Array to fit new Dimensions (1D Array)
                    this.data = new Array(this.rows);
                }

                // Map Data to Matrix
                this.map((_, x) => arr[x]);
            }
    
    
            // Check if 2D Array
            else {
                // Validate 2D Array with consistant type and same sub-array length
                // Get the number of columns
                this.columns = this.Validate2DArray(arr, "number", true);

                // Eliminate Redundant Array Re-Creation
                if (this.rows !== arr.length || this.columns !== arr.length) {
                    // Set new Dimensions
                    this.rows = arr.length;

                    // Reset Array to fit new Dimensions (1D Array)
                    this.data = new Array(this.rows);
                    for (let x = 0; x < this.rows; x++){
                        this.data[x] = new Array(this.columns);
                    }
                }

                // Map Data to Matrix
                this.map((_, x, y) => arr[x][y]);
            }

            // Set the Shape
            this.shape = `[${this.rows},${this.columns}]`;
        }
    
        // Check if any Errors | Throw Error
        catch (e) {
            console.error(e);
            return undefined;
        }

        // Chaining Methods
        return this;
    }


    /** Randomizes the Entire Matrix Values into random values between 0 and 10 (Default)
     * @param min Minimum Random Generation (Optional)
     * @param max Maximum Random Generation (Optional)
     */
    public randomize(min?: number, max?: number): void {
        // Make sure there is a min and max
        if (min === undefined || max === undefined) {
            min = 0;
            max = 10;
        }

        this.map(() => Math.random() * (max - min) + min);
    }
    
    
    /** @returns A Copy of Current Matrix */
    public copy(): Matrix {
        return Matrix.map(this, val => val);
    }


    /** @returns An Array Copy of Matrix's Data */
    public dataCopy(): (number | number[])[] {
        const newArr = [];

        for (let x = 0; x < this.rows; x++){
            // 2D Array Copy
            if (this.data[x] instanceof Array) {
                newArr.push([]);

                for (let y = 0; y < this.columns; y++){
                    newArr[x][y] = this.data[x][y];
                }
            }
            
            // 1D Array Copy
            else {
                newArr[x] = this.data[x];
            }
        }

        return newArr;
    }


    /** Resets & Refreshes the Matrix's Properties */
    public reset(): void {
        // Shape and Data
        this.shape      = `[${this.rows},${this.columns}]`;
        this.data       = Array(this.rows);

        // Make Data array an empty ('0') 2D Array
        for(let x=0; x<this.rows; x++) {
            this.data[x] = new Array(this.columns);

            for(let y=0; y<this.columns; y++) {
                this.data[x][y] = 0;
            }
        }
    }
    
    
    /** Transposes Current Matrix
     * Moves the Columns into the Rows and Rows into the Columns
     */
    public transpose(): void {
        // Get a Copy of the Data
        const oldData   = this.dataCopy();
        
        // Backup Rows and Columns
        const rows      = this.rows;
        const cols      = this.columns;

        // Flip the Dimensions
        this.rows       = this.columns;
        this.columns    = oldData.length;

        // Reset the Matrix
        this.reset();


        // 1D Matrix
        // Example: [ [1,2,3] ]
        if (rows === 1)                 { this.map((_, x) => oldData[0][x]); }

        // Example: [1,2,3]
        else if (cols === 1)            { this.map((_, __, y) => oldData[y]); }
        
        // 2D Matrix
        else                            { this.map((_, x, y) => oldData[y][x]); }
    }

     
// Gets and Sets

    /** @returns Rows of Matrix */
    public getRows(): number {
        return this.rows;
    }
    

    /** @returns Rows of Matrix */
    public getColumns(): number {
        return this.columns;
    }
    
    

// Serializing
    /** Converts Current Object into JSON */
    public json(): string {
        return JSON.stringify(this);
    }
    

    /** Converts JSON String into Matrix Object
     * @param jsonStr JSON String that will be parsed
     * @returns A Matrix Object with JSON Data
     */
    static parse(jsonStr: string): Matrix {
        const data = JSON.parse(jsonStr);

        const matrix = new Matrix(data.rows, data.columns);
        matrix.data = data.data;

        return matrix;
    }
     
     

// Static Methods

    /** Matrix Multiplies two Matricies
     * 
     * @param matrixA First Matrix
     * @param matrixB Second Matrix
     * @returns New Matrix that yields the result of the two Matricies Multiplied
     */
    static multiply(matrixA: Matrix, matrixB: Matrix): Matrix {
        // Check if Multiplication is Valid
        if (!(matrixA.getColumns() === matrixB.getRows())) {
            console.error("Matrix Multiplication Error: Invalid Dimensions for matrixA and matrixB. matrixA's Columns must equal matrixB's Rows!");
            return null;
        }

        // Multiply Vector with Matrix
        if (matrixB.getColumns() === 1 || matrixB.getRows() === 1) {
            return new Matrix(matrixA.rows, matrixB.columns)
                .map((_, x) => {
                    let total = 0;
                    for (let y = 0; y < matrixB.rows; y++) {
                        total += matrixA.data[x][y] * (matrixB.data as number[])[y];
                    }
                    return total;
                });
        }


        // Multiply the 2 Matricies
        return new Matrix(matrixA.rows, matrixB.columns)
        .map((_, x, y) => {
            let sum = 0;
            for (let k = 0; k < matrixA.columns; k++) {
                sum += matrixA.data[x][k] * matrixB.data[k][y];
            }
            return sum;
        });
    }
    
    
    /** Static Mapping Method that assigns a Function to each element of a given Matrix
     * @param matrix The Matrix Object that will be used to map
     * @param fn The Function that will be applied to every element
     * @returns a New Mapped Matrix Object
     */
    static map(matrix: Matrix, fn: Function): Matrix {
        return new Matrix(matrix.getRows(), matrix.getColumns())
            .map((val, x, y) => fn(matrix.data[x][y], x, y));
    }


    /** Transposes Given Matrix and returns the New Object */
    static transpose(matrix: Matrix): Matrix {
        // 1D Matrix
        // Example: [ [1,2,3] ]
        if (matrix.getRows() === 1) {
            return new Matrix(matrix.getColumns(), matrix.getRows())
                .map((_, x) => matrix.data[0][x]);
        }

        // Example: [1,2,3]
        else if (matrix.getColumns() === 1) {
            return new Matrix(matrix.getColumns(), matrix.getRows())
                .map((_, __, y) => matrix.data[y]);
        }
        
        // 2D Matrix
        else {
            return new Matrix(matrix.getColumns(), matrix.getRows())
                .map((val, x, y) => matrix.data[y][x]);
        }
    }

    /** Calculates the Inverted Matrix of the provided Matrix  | Restricted to 2x2 Matrices 
     * 
     * @param mat The Matrix that will be inverted
     * @returns Inverted Matrix (In Expanded Form)
     */
    static invert2x2(mat: Matrix): Matrix {
        // Restrict to 2x2
        if (mat.columns !== 2 && mat.rows !== 2) {
            console.error("Matrix Invert: 'invert2x2' Restricted to 2x2 Matricies ONLY!");
            return null;
        }

        // Get the Determinant
        const det = this.det(mat);

        // Check if Matrix is Invertible
        if (det === 0 || det === null) {
            console.error("Matrix Invert: Matrix is NOT Invertible!");
            return null;
        }

        const arr = mat.dataCopy();
        const colMax = arr.length - 1;

        // Flip Right Across
        for (let x = 0; x < arr.length; x++) {
            arr[colMax - x][colMax - x] = mat.data[x][x];
        }

        // Negative Left Across
        for (let x = colMax; x >= 0; x--) {
            arr[x][colMax - x] = -arr[x][colMax - x];
        }

        // Apply data to Matrix
        return new Matrix(mat.rows, mat.columns)
            .map((_, x, y) => {
                return arr[x][y] * (1 / det);
            });
    }

    /** Calculates the Determinant of the provided Matrix 
     * 
     * @param mat The Matrix that will be calculated for Determinant
     * @returns Determinant Value
     */
    static det(mat: Matrix): number {
        // Validate the Matrix
        // Shape HAS to be a Square Matrix and cannot be scalar
        if (mat.rows !== mat.columns) {
            console.error("Matrix Determinant: Invalid Matrix! Dimensions have to be a Square Matrix!");
            return null;
        }

        // Check if scalar
        else if (mat.rows === 1 && mat.columns === 1) {
            return (mat.data as number[])[0];
        }

        // Calculate the Determinant
        let detRight = 1;
        let detLeft = 1;

        // Calculate the Rightwards Across Value
        for (let x = 0; x < mat.data.length; x++) {
            detRight *= mat.data[x][x];
        }

        // Calculate the Leftwards Across Value
        const colMax = mat.data.length - 1;

        for (let x = colMax; x >= 0; x--) {
            detLeft *= mat.data[x][colMax - x];
        }

        // Return Determinant Value
        return detRight - detLeft;
    }


    /** Creates a Matrix Object from an Array
     * @param array The (1D or 2D) Array that will be used to create the Object
     * @returns Matrix Object
     */
    static fromArray(array: number[] | number[][]): Matrix {
        return new Matrix().set(array);
    }
}