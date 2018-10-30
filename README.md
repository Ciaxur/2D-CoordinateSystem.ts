# 2D Coordinate System
### Simple 2D Cartesian Coordinate System

---
#### Description
The reason for starting this project is to apply concepts from my Linear Algebra course into a visual representation that is simple and easy to use. I will be updating this repository as I learn new concepts. This is free to use, so feel free to do anything that is under the MIT Licence. Also if you have any suggestions, find a bug, or want to add anything new, just request a Pull Request :).

---
#### Pre-Requisites
Make sure that where ever the "main" file is held, have a Global Variable called **`ctx`** that holds a Cavnas' 2D Context for Drawing. The CoordinateSystem Class will **NOT** work if this has not been declared. Look into the code in **`app.ts`** under the **`src\`** directory for more information.

Example Code for doing so (In the main file):
```typescript
// Global Variables
let ctx;        // THIS IS IMPORTANT TO BE GLOBAL

// When the DOM Content has been loaded
document.addEventListener("DOMContentLoaded", () => {
    // Create a Canvas Element
    const canvas = document.createElement("canvas");

    // Declare the Context 2D from the Canvas that was created (THIS IS IMPORTANT)
    ctx = canvas.getContext("2d");

    // Append the Canvas Element into the body of the document
    document.body.appendChild(canvas);

    // Set the Properties of the Canvas (Width & Height)
    // I set the Canvas Dimensions to the Entire Window's Dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
```

---
#### CoordinateSystem Class

---
### `Public Methods`
- **Constructor**
    - **`coordWidth`** - The Cartesian Coordinate System Width
    - **`coordHeight`** - The Cartesian Coordinate System Height
    - **`resolution`** - The Pixel Spaces between each Coordinate Unit

- **drawCoordinateSystem**
    - Draws the Coordinate System onto the Canvas

- **resize**
    - Resizes the Coordinate System's Dimensions

- **addVector**
    - Adds a Vector onto the Coordinate System
    - Optional: **`Matrix Object`** - Has to be a (mx1 or 1xn) Matrix Object
    - **`x`** - The x-Axis of the Vector | **`Matrix Object`**
    - **`y`** - The y-Axis of the Vector

- **addPoint**
    - Adds a Point onto the Coordinate System
    - Optional: **`Matrix Object`** - Has to be a (mx1 or 1xn)  Matrix Object
    - **`x`** - The x-Axis of the Point | **`Matrix Object`**
    - **`y`** - The y-Axis of the Point

- **addPolynomial**
    - Adds a Polynomial onto the Coordinate System
    - Default is Linear Polynomial "*mx + b*"
    - Alternative (**`Matrix Object`**) is a Polynomial
    - Optional: **`Matrix Object`** - Has to be a (mx1 or 1xn)  Matrix Object
    - **`m`** - The m value for a Linear Polynomial | **`Matrix Object`**
    - **`b`** - The b value for a Linear Polynomial

- **setPointerDim**
    - Sets the Triangle "Pointer" of the Vector's Dimensions
    - **`width`** - The Width of the Triangle
    - **`height`** - The Height of the Triangle

- **reset**
    - Resets the Data that is on the Coordinate System (Removes all vectors)

- **clearVectors**
    - Resets the Vector Data that is on the Coordinate System

- **clearPoints**
    - Resets the Points Data that is on the Coordinate System

- **clearPolynomials**
    - Resets the Polynomial Data that is on the Coordinate System

- **drawProjectionMatrix**
    - Draws an Estimate (for simple Projection Matricies) onto the Coordinate System
    - **`mat`** - The Projection Matrix Object (Has to be a Valid One | Will be validated anyway)

- **drawProjectionFromVec**
    - Draws the Projection of a given Vector onto a given Projection Matrix
    - **`matrixProjection`** - The Projection Matrix that will be used
    - **`vec`** - The Vector that will be used to project onto the Projection Matrix

- **drawBestFitLienar**
    - Draws Best Fit Linear Polynomoial to Points
    - **`pointsArr`** - The Points 2D Array that will be used to calculate the Fit Line

- **getPointsArr**
    - Points Data as Array

---
### `Private Methods`
- **getRotationMatrix**
    - Returns a (2x2) Rotation Matrix
    - **`angle`** - The Angle that will be used in Radians

- **dotMat2**
    - Performs a Dot-Product between a (2x2) Matrix and a (1x2) Vector
    - **`mat`** - A Matrix Object (2x2) Dimensions
    - **`vec`** - A Matrix Object (1x2) Dimensions (The 2D Vector)

- **drawVectors**
    - Draws all Vectors from **`vectorData`** onto Plane

- **drawPoints**
    - Draws all Points from **`pointsData`** onto Plane

- **drawPolynomials**
    - Draws all Polynomials from **`polynomialData`** onto Plane

- **checkProjectionMatrix**
    - Checks if a given Matrix is a Valid Projection Matrix
    - **`mat`** - The Projection Matrix that will be Validated

- **add_Mx2**
    - Checks if a given Matrix is a Valid Projection Matrix
    - **`x`** - X-Axis Value or Matrix Object that will be added to Data
    - **`y`** - Y-Axis Value that will be added to Data
    - **`dataType`** - The Data Type of the Data (vector, point, or polynomial)

- **drawCirc**
    - Draws a circle at the given Coordinate Parameters
    - **`x`** - X-Axis Point Value
    - **`y`** - Y-Axis Point Value

- **adjustToOrigin**
    - Adjusts Value Relative to Origin
    - **`n`** - Coordinate Value that will be adjusted
    - **`isY`** - Boolean that states if Relative to X or Y Origin


---
### `Static Methods`
- **calculateMagnitude**
    - Calculates the Magnitude of a given Vector
    - **`x`** - The x-Axis of the Vector
    - **`y`** - The y-Axis of the Vector

- **calculateAngle**
    - Calculates the Angle of a given Vector in Radians (As a Unit Circle)
    - **`x`** - The x-Axis of the Vector
    - **`y`** - The y-Axis of the Vector

- **solvePolynomialY**
    - Calculates Polynomial for 'y'
    - **`x`** - The x value that will be calculated against the Polynomial
    - **`polyArr`** - Array of Polynomial Values | EXAMPLE INPUT: [1,2,3] -> [1x^2, 2x, 3] -> y = x^2 + 2x + 3


---
### License
Licensed under the [MIT License](LICENSE).