var SelectionTool = /** @class */ (function () {
    function SelectionTool() {
    }
    SelectionTool.prototype.mouseDown = function () {
        console.log("Selection icon");
    };
    SelectionTool.prototype.mouseUp = function () {
        console.log("Draw a rectongle selection area");
    };
    return SelectionTool;
}());
var EraserTool = /** @class */ (function () {
    function EraserTool() {
    }
    EraserTool.prototype.mouseDown = function () {
        console.log("Eraser icon");
    };
    EraserTool.prototype.mouseUp = function () {
        console.log("Erase something");
    };
    return EraserTool;
}());
/**
 * Canvas通过将功能委托给Tool来实现,Tool又通过具体的类来实现
 */
var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    Canvas.prototype.getCurrentTool = function () {
        return this.currentTool;
    };
    Canvas.prototype.setCurrentTool = function (tool) {
        this.currentTool = tool;
    };
    Canvas.prototype.mouseDown = function () {
        this.currentTool.mouseDown();
    };
    Canvas.prototype.mouseUp = function () {
        this.currentTool.mouseUp();
    };
    return Canvas;
}());
var canvas = new Canvas();
canvas.setCurrentTool(new EraserTool());
canvas.mouseDown();
canvas.mouseUp();
