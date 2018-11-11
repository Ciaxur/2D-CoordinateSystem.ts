"use strict";
/** Menu Class for a CoordinateSystem Object */
class Menu {
    /** Initiates Menu onto Coordinate System
     *
     * @param coorSys The Coordinate System Object that will be used for Menu
     * @param ctx The Canvas Rendering Context 2D used to Draw
     */
    constructor(coorSys, ctx) {
        // Menu Buttons Data
        this.buttons = [];
        // Initiate Menu Data
        this.mainCoorSys = coorSys;
        this.ctx = ctx;
        this.isActive = false;
        // Initate Menu data
        this.menuBtn = {
            x: 10, y: 10,
            h: 28, w: 28,
            primaryClr: { r: 128, g: 128, b: 128, a: 0.1 },
            secondaryClr: { r: 128, g: 128, b: 128, a: 0.5 }
        };
        this.menuBox = {
            x: 10, y: 10,
            h: 400, w: 250,
            primaryClr: { r: 128, g: 128, b: 128, a: 0.1 },
            secondaryClr: { r: 128, g: 128, b: 128, a: 0.5 }
        };
        this.closeMenuBtn = {
            x: this.menuBox.x + this.menuBox.w - 5,
            y: this.menuBox.y - 5,
            h: 10, w: 10,
            primaryClr: { r: 180, g: 0, b: 0, a: 0.3 }
        };
        // Setup Menu Buttons
        this.initMenuButtons();
    }
    /** Initiates Menu Buttons Data */
    initMenuButtons() {
        // Button Data
        const btnText = ["Add Vector", "Add Point", "Add Polynomial",
            "Clear Vectors", "Clear Points", "Clear Polynomials", "Clear System"];
        const btnCount = btnText.length;
        const btnOffset = 30;
        // Button Functions
        const btnFn = [
            this.mainCoorSys.addVector.bind(this.mainCoorSys),
            this.mainCoorSys.addPoint.bind(this.mainCoorSys),
            this.mainCoorSys.addPolynomial.bind(this.mainCoorSys),
            this.mainCoorSys.clearVectors.bind(this.mainCoorSys),
            this.mainCoorSys.clearPoints.bind(this.mainCoorSys),
            this.mainCoorSys.clearPolynomials.bind(this.mainCoorSys),
            this.mainCoorSys.reset.bind(this.mainCoorSys)
        ];
        // Button Functions Arguments
        const btnFnArgs = [
            2, 2, 2,
            0, 0, 0, 0
        ];
        // Text Data
        const txtOffset = { x: 10, y: 8 };
        // Apply Button Data
        for (let i = 0; i < btnCount; i++) {
            const text = (i < btnText.length) ? btnText[i] : `btn${i + 1}`;
            const defaultFn = () => { console.log(`No Function Associated to button: '${text}'`); };
            this.buttons.push({
                // Button Position and Dimension Data
                rectShape: {
                    x: 15, y: 20 + (i * btnOffset),
                    w: 10, h: 10,
                    // Primary Color Data
                    primaryClr: {
                        r: 255, g: 255, b: 255, a: 0.8
                    }
                },
                // Text Data
                text: text,
                // Text Position
                textPos: {
                    x: 20 + txtOffset.x,
                    y: 20 + (i * btnOffset) + txtOffset.y
                },
                // Function Associated
                fn: (i < btnFn.length)
                    ? (btnFn[i] == null)
                        ? defaultFn
                        : btnFn[i]
                    : defaultFn,
                // Function Arguments
                fnArgs: btnFnArgs[i] | 0
            });
        }
    }
    /** Starts the Menu
     * Has the Logic behind drawing the menu, display or not, etc...
     */
    start() {
        // If Menu is active then show
        if (this.isActive) {
            this.drawMenu();
        }
        // Else Draw the Button
        else {
            this.drawMenuButton();
        }
    }
    /** Triggers ON/OFF Menu */
    triggerMenu() {
        this.isActive = !this.isActive;
    }
    /** Activates Button Depending on its Index
     *
     * @param index The Value of the Button | Position2D Object of the Mouse position
     */
    clickedButton(index) {
        // Value Was Given
        if (!isNaN(index)) {
            // Make sure Index is found in buttons array
            if (index < this.buttons.length && index >= 0) {
                this.buttons[index].fn();
            }
            // Invalid Index
            else {
                console.error("Invalid Index! Button Array Index Invalid!");
            }
            // Done
            return;
        }
        // Position Object Given
        // Check for Mouse Position within any of the Buttons
        else {
            // Check Mouse vs Buttons
            for (const btn of this.buttons) {
                // Obtain Button's Location
                const obj = {
                    x: btn.rectShape.x,
                    y: btn.rectShape.y
                };
                // Obtain Button's Shape
                const shape = {
                    w: btn.rectShape.w,
                    h: btn.rectShape.h
                };
                // If mouse within
                if (Menu.within(obj, shape, index)) {
                    // Prompt User for Arguments (for now it's 2)
                    // Call Function with those Arugments
                    if (btn.fnArgs == 2) {
                        const a = parseInt(prompt("Enter Argument 1: "));
                        const b = parseInt(prompt("Enter Arguemnt 2: "));
                        btn.fn(a, b);
                    }
                    // Call Function without Arguments
                    else {
                        btn.fn();
                    }
                    return; // Stop Looking
                }
            }
        }
    }
    /** Sets Entire Menu Button Color
     * Both Parameters are optional in order to set one or the other
     *
     * @param plate Menu Button Plate Color Object
     * @param burgerSlide Menu Button Burger Slides Color Object
     */
    setMenuBtnColor(plate, burgerSlide) {
        // Check for Plate Input
        if (plate) {
            // Validate Input
            plate.r = (plate.r >= 0 && plate.r <= 255) ? plate.r : 0; // Between 0->255
            plate.g = (plate.g >= 0 && plate.g <= 255) ? plate.g : 0; // Between 0->255
            plate.b = (plate.b >= 0 && plate.b <= 255) ? plate.b : 0; // Between 0->255
            plate.a = (plate.a >= 0 && plate.a <= 1) ? plate.a : 1; // Between 0->1
            // Set Data
            this.menuBtn.primaryClr = plate;
        }
        // Check for Burger Slides Input
        if (burgerSlide) {
            // Validate Input
            burgerSlide.r = (burgerSlide.r >= 0 && burgerSlide.r <= 255) ? burgerSlide.r : 0;
            burgerSlide.g = (burgerSlide.g >= 0 && burgerSlide.g <= 255) ? burgerSlide.g : 0;
            burgerSlide.b = (burgerSlide.b >= 0 && burgerSlide.b <= 255) ? burgerSlide.b : 0;
            burgerSlide.a = (burgerSlide.a >= 0 && burgerSlide.a <= 1) ? burgerSlide.a : 1;
            // Set Data
            this.menuBtn.secondaryClr = burgerSlide;
        }
    }
    /** Returns the Button Plate Color Object
     * @returns Button Plate Color
     */
    getButtonPlateColor() {
        return this.menuBtn.primaryClr;
    }
    /** Returns the Button Burger Slides Color Object
     * @returns Button Burger Slides Color
     */
    getButtonBurgerSlidesColor() {
        return this.menuBtn.secondaryClr;
    }
    /** Returns Button Location
     * @returns Position2D Object that holds the Button's Location
     */
    getButtonPosition() {
        return { x: this.menuBtn.x, y: this.menuBtn.y };
    }
    /** Returns Button Shape
     * @returns Shape2D Object for Button Shape
     */
    getButtonShape() {
        return { w: this.menuBtn.w, h: this.menuBtn.h };
    }
    /** Returns current Menu Status
     * Closed = Menu Button Displayed
     * Open = Entire Menu Box Displayed
     * @return State of Menu (True=Open | Flase=Closed)
    */
    getMenuStatus() {
        return this.isActive;
    }
    /** Returns Close Button Location
     * @returns Position2D Object that holds the Close Button's Location
     */
    getCloseMenuBtnPosition() {
        return { x: this.closeMenuBtn.x, y: this.closeMenuBtn.y };
    }
    /** Returns Button Shape
     * @returns Shape2D Object for Button Shape
     */
    getCloseMenuBtnShape() {
        return { w: this.closeMenuBtn.w, h: this.closeMenuBtn.h };
    }
    /** Draws the Menu Box and Contents */
    drawMenu() {
        this.ctx.save();
        // Background Menu
        this.ctx.fillStyle = this.colorToString(this.menuBox.primaryClr);
        this.ctx.fillRect(this.menuBox.x, this.menuBox.y, this.menuBox.w, this.menuBox.h);
        // Draw Buttons
        for (let i = 0; i < this.buttons.length; i++) {
            // Draw Rectangle
            this.ctx.fillStyle = this.colorToString(this.buttons[i].rectShape.primaryClr);
            this.ctx.fillRect(this.buttons[i].rectShape.x, this.buttons[i].rectShape.y, this.buttons[i].rectShape.w, this.buttons[i].rectShape.h);
            // Draw Text
            this.ctx.fillText(this.buttons[i].text, this.buttons[i].textPos.x, this.buttons[i].textPos.y);
        }
        // Draw Close Button
        this.ctx.fillStyle = this.colorToString(this.closeMenuBtn.primaryClr);
        this.ctx.ellipse(this.closeMenuBtn.x + this.closeMenuBtn.h / 2, this.closeMenuBtn.y + this.closeMenuBtn.h / 2, this.closeMenuBtn.w / 2, this.closeMenuBtn.h / 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
    /** Draws the Menu Button */
    drawMenuButton() {
        this.ctx.save();
        // Background Button
        this.ctx.fillStyle = this.colorToString(this.menuBtn.primaryClr);
        this.ctx.fillRect(this.menuBtn.x, this.menuBtn.y, this.menuBtn.w, this.menuBtn.h);
        // Draw Burger Slides
        this.ctx.fillStyle = this.colorToString(this.menuBtn.secondaryClr);
        this.ctx.fillRect(14, 17, 20, 3);
        this.ctx.fillRect(14, 22, 20, 3);
        this.ctx.fillRect(14, 27, 20, 3);
        this.ctx.restore();
    }
    /** Transfors RGBA Object to rgba string rgba(r, g, b, a)
     * @param rgba RGBA Object to translate into string format
     */
    colorToString(rgba) {
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    }
    /** Calculates if Mouse Position is within Object
     * @param pos Object Position (Position2D Object)
     * @param objShape Object Shape (Shape2D Object)
     * @param mousePos Mouse Position (Position2D Object)
     * @returns A Boolean on the state of mouse position within box
     */
    static within(pos, objShape, mousePos) {
        if ((pos.x) < mousePos.x &&
            (pos.y) < mousePos.y &&
            (pos.x + objShape.w) > mousePos.x &&
            (pos.y + objShape.h) > mousePos.y) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=Menu.js.map