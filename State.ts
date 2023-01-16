/**
 * 方便功能拓展.在后期添加新功能的时候能不修改现有代码,通过拓展Tool的实现来添加功能.符合开闭原则.
 */
interface Tool {
  mouseDown(): void;
  mouseUp(): void;
}

class SelectionTool implements Tool {
  mouseDown(): void {
    console.log("Selection icon");
  }
  mouseUp(): void {
    console.log("Draw a rectongle selection area");
  }
}

class EraserTool implements Tool {
  mouseDown(): void {
    console.log("Eraser icon");
  }
  mouseUp(): void {
    console.log("Erase something");
  }
}

/**
 * Canvas通过将功能委托给Tool来实现,Tool又通过具体的类来实现
 */
class Canvas {
  private currentTool: Tool;

  getCurrentTool(): Tool {
    return this.currentTool;
  }

  setCurrentTool(tool: Tool) {
    this.currentTool = tool;
  }

  mouseDown() {
    this.currentTool.mouseDown();
  }

  mouseUp() {
    this.currentTool.mouseUp();
  }
}

let canvas = new Canvas();
canvas.setCurrentTool(new EraserTool());
canvas.mouseDown();
canvas.mouseUp();
