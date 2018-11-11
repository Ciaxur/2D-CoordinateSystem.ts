## November 11, 2018
---

### Added Class **`Menu Class`**
- Added new Intefaces:
    - **`Rectangle`**
        - Holds Data for a Rectangle Object
            - **`x`** - The X-Location of the Rectangle
            - **`y`** - The Y-Location of the Rectangle
            - **`w`** - The Width of the Rectangle
            - **`h`** - The Height of the Rectangle
            - **`primaryClr`** - Primary Color Object for the Rectangle (Of Type *RGBA*)
            - **`secondaryClr`** - Secondary Color Object for the Rectangle (Optional) (Of Type *RGBA*)
    - **`Button`**
        - Holds Data for a Button Object
            - **`rectShape`** - Shape of Button (Of Type *Rectangle*)
            - **`text`** - The Text that the Button Holds (Optional)
            - **`textPos`** - The Position of where the *`text`* will be (Of Type *Position2D*)
            - **`fn`** - Holds Method that can be called (Optional)
            - **`fnArgs`** - Number of Arguments required for *`fn`* (Optional)
    
    - **`RGBA`**
        - Holds Data for Color
            - **`r`** - The Red Color
            - **`g`** - The Green Color
            - **`b`** - The Blue Color
            - **`a`** - The Alpha Color
    
    - **`Position2D`**
        - Holds Data for 2D Positioning
            - **`x`** - The X-Location Value
            - **`y`** - The Y-Location Value

    - **`Shape2D`**
        - Holds Data for 2D Shapes
            - **`w`** - The Width Value
            - **`h`** - The Height Value

- Added Data Variables:
    - Added **`mainCoorSys`**
        - Holds CoordinameSystem Object
        - The Main Coordinate System Object that will be used for the *`Menu Object`*
    
    - Added **`ctx`**
        - Holds the Canvas Rendering Context 2D Object used for Drawing

    - Added **`isActive`**
        - Holds the current Menu Status (*false = Menu Closed* or *true = Menu Opened*)
    
    - Added **`menuBtn`**
        - Holds a *`Rectangle Object`* associated for the Menu Button Data
    
    - Added **`menuBox`**
        - Holds a *`Rectangle Object`* associated for the Menu Box Data when Active
    
    - Added **`closeMenuBtn`**
        - Holds a *`Rectangle Object`* associated for the Close Menu Button Data
    
    - Added **`buttons`**
        - Holds a *`Button Object Array`* associated for all the Buttons inside of the *`menuBox`*

- Added new Methods:
    - **`constructor`**
        - Requires a *`CoordinateSystem Object`* called **`coorSys`** and a *`CanvasRenderingContext2D`* called **`ctx`**
        - Initiates the Class Data Variables

    - **`initMenuButtons`** (*private method*)
        - Does not required any Parameters
        - Does not have any Returns
        - Sets up the **`buttons`** Array with Data
    
    - **`start`** (*public method*)
        - Does not required any Parameters
        - Does not have any Returns
        - Is responsible for the Logic behind what to draw
    
    - **`triggerMenu`** (*public method*)
        - Does not required any Parameters
        - Does not have any Returns
        - Switches ON/OFF **`isActive`**
    
    - **`clickedButton`** (*public method*)
        - Requires One Parameter **`index`**
            - (1) Holds the **`buttons`** Array Index for what was clicked
            - (2) Holds the *`Position2D`* Data for the Mouse Location
        - Does not have any Returns
        - Finds and activates the Function of the Button from **`buttons`** Array
    
    - **`setMenuBtnColor`** (*public method*)
        - Two Optional Parameters **`plate`** and **`burgerSlide`**
            - **`plate`** - An **`RGBA`** Interface Type that holds the Color for the Primary
            - **`burgerSlide`** - An **`RGBA`** Interface Type that holds the Color for the Secondary
        - Does not have any Returns
        - Assigns new Color(s) for **`menuBtn`**
    
    - **`getButtonPlateColor`** (*public method*)
        - Does not required any Parameters
        - Returns **`menuBtn`** Primary Color *`RGBA`* Interface Type
    
    - **`getButtonBurgerSlidesColor`** (*public method*)
        - Does not required any Parameters
        - Returns **`menuBtn`** Secondary Color *`RGBA`* Interface Type
    
    - **`getButtonPosition`** (*public method*)
        - Does not required any Parameters
        - Returns **`menuBtn`** Position *`Position2D`* Interface Type

    - **`getButtonShape`** (*public method*)
        - Does not required any Parameters
        - Returns **`menuBtn`** Shape *`Shape2D`* Interface Type
    
    - **`getMenuStatus`** (*public method*)
        - Does not required any Parameters
        - Returns **`isActive`**
    
    - **`getCloseMenuBtnPosition`** (*public method*)
        - Does not required any Parameters
        - Returns **`closeMenuBtn`** Position *`Position2D`* Interface Type
    
    - **`getCloseMenuBtnShape`** (*public method*)
        - Does not required any Parameters
        - Returns **`closeMenuBtn`** Position *`Position2D`* Interface Type
    
    - **`drawMenu`** (*private method*)
        - Does not required any Parameters
        - Does not have any Returns
        - Draws Menu Box on Canvas
    
    - **`drawButton`** (*private method*)
        - Does not required any Parameters
        - Does not have any Returns
        - Draws Menu Button on Canvas
    
    - **`colorToString`** (*private method*)
        - Requires One Parameter
            - **`rgba`** - An **`RGBA`** Interface Type
        - Returns String value from Parameter Data
        - Converts the **`rgba`** data to String
            - "rgba(rVal, gVal, bVal, aVal)"
    
    - **`within`** (*static method*)
        - Requires Three Parameters
            - **`pos`** - A **`Position2D`** Interface Type
                - Holds Position of Object
            - **`objShae`** - A **`Shape2D`** Interface Type
                - Holds Shape Data for Object
            - **`mousePos`** - A **`Position2D`** Interface Type
                - Holds Position of Mouse
        - Returns Boolean for whether Mouse is within the Object or not
        - Determine if Mouse Position is within the Object
        
    

### Changes to **`app`**
- Added new Event Listners:
    - **`Mouse Clicked Event`**
        - Determine where the mouse click occured on the new Menu System
            - Toggle Menu (Close/Open)
            - Click Menu Buttons (Actions)

---
---


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

    
