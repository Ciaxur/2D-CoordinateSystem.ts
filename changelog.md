## October 30, 2018
---

### Changes to **`CoordinateSystem Class`**
- Modified Methods:
    - **`drawCoordinateSystem`**
        - Checks for **`data`** before calling to draw them
    - **`calculateMagnitude`**
        - Removed the "public static" to "static"
    - **`calculateAngle`**
        - Removed the "public static" to "static"
    
- Added new Methods:
    - **`clearVectors`**
        - Clears **`vectorData`**
    - **`clearPoints`**
        - Clears **`pointsData`**
    - **`clearPolynomials`**
        - Clears **`polynomialData`**
    - **`drawBestFitLinear`**
        - Takes in 1 Parameter (Requried)
            - **`pointsArr`** - A 2D Array of all the Points in which to fit the line
        - Draws a Linear Polynomial to Fit the points given
    - **`getPointsArr`**
        - Returns a 2D Array of all the Points in the **`pointsData`**

### Changes to **`Matrix Class`**
- Modified Methods:
    - **`constructor`**
        - Take in an Array to set as the Data instead of always calling the **`fromArray`** method
    - **`multiply`** (*public method* and *static method*)
        - Adapted method to Matrix Multiply Correctly
        - Is able to Dot Product Vector with Matrix
    - **`dot`** (*static method*)
        - **Removed** 

- Added new Methods:
    - **`invert2x2`** (*static method*)
        - Takes in 1 Parameter (Required)
            - **`mat`** - The Matrix that will be Inverted
        - Calculate and return the Inverted Matrix of the given Matrix Parameter
    - **`det`** (*static method*)
        - Takes in 1 Parameter (Required)
            - **`mat`** - The Matrix that will be calculated for the Determinant
        - Calculate and return the Determinant of the given Matrix Parameter

---
---


## October 29, 2018
---

### Changes to **`CoordinateSystem Class`**

- Modified Data Variables:
    - Renamed **`data`** to **`vectorData`**
        - Holds Vector Objects | **`(mx1) or (1xn) Shapes`**
    - Added **`pointsData`**
        - Holds Points on Coordinate System | **`(mx1) or (1xn) Shapes`**
    - Added **`polynomialData`**
        - Holds **`(mx1) or (1xn) Shapes`**
        - Vectors of **`a,b,c,d, etc...`** for Polynomials
    - Added **`originX`**
        - Holds the value for the Relative Origin in X-Axis
    - Added **`originY`**
        - Holds the value for the Relative Origin in Y-Axis

- Modified Methods:
    - **`drawCoordinateSystem`**
        - Removed looping through Data and Calling their Methods to draw
    - **`drawVectors`**
        - Removed Parameters
        - Loops through the **`vectorData`** and drawing them instead of **`drawCoordinateSystem`** doing so and sending the data as a parameter
    - **`addVector`**
        - Calls **`add_Mx2`** to do the work
    - **`reset`**
        - Resets **`vectorData`**, **`pointsData`**, and **`polynomialData`**

- Added new Methods:
    - **`drawPoints`**
        - Draws all Points from the **`pointsData`**
    - **`addPoint`**
        - Takes in two Variables
            - **`x`** The X-Axis Value | A (mx1) or (1xn) Matrix
            - **`y`** The Y-Axis Value
        - Calls **`add_Mx2`** to do the work
    - **`drawPolynomials`**
        - Draws all Polynomials from the **`polynomialData`**
    - **`addPolynomial`**
        - Takes in two Variables
            - **`m`** The *"m"* value in *"mx + b"* assumed Linear Polynomial | A (mx1) or (1xn) Matrix assumed Polynomial
            - **`b`** The *"b"* value in *"mx + b"* assumed Linear Polynomial
        - Calls **`add_Mx2`** to do the work if a Matrix Object was sent
    - **`solvePolynomialY`**
        - Takes in two Varaibles (Required)
            - **`x`** The x Value that will be multiplied by the polynomial
            - **`polyArr`** Polynomial Array that hols the values of each x-power
        - Calculates the Polynomial for 'x' and returns result 'y'
    - **`add_Mx2`**
        - Takes in 3 Variables (Required)
            - **`x`** The x-axis Value or Matrix Object *(mx1 or 1xn Shape)*
            - **`y`** The y-axis Value
            - **`dataType`** The Coordinate Data Type (*vector, point, or polynomial*)
        - Validates Data and pushs it to it's Data Type
    - **`drawCirc`**
        - Takes in 2 Variables (Required)
            - **`x`** The x-axis Value or Matrix Object *(mx1 or 1xn Shape)*
            - **`y`** The y-axis Value
        - Draws Circle with Radius "5" on given Parameters
    - **`adjustToOrigin`**
        - Takes in 2 Variables (Required)
            - **`n`** The Value to be Adjusted
            - **`isY`** Boolean stating if value is Relative to Y Axis
        - Returns value Relative to Origin Points

    
