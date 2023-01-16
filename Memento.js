// // class Editor {
// //   contents = [];
// //   getContent() {
// //     let len = this.contents.length;
// //     if (len == 0) return "";
// //     return this.contents[len - 1];
// //   }
// //   setContent(content) {
// //     this.contents.push(content);
// //   }
// //   undo() {
// //     this.contents.pop();
// //   }
// // }
// // const editor = new Editor();
// // editor.setContent("a");
// // editor.setContent("b");
// // editor.setContent("C");
// // editor.undo();
// // editor.undo();
// // console.log(editor.getContent());
var Editor = /** @class */ (function () {
    function Editor() {
    }
    Editor.prototype.setContent = function (content) {
        this.content = content;
    };
    Editor.prototype.getContent = function () {
        return this.content;
    };
    Editor.prototype.createState = function () {
        return new EditorState(this.content);
    };
    Editor.prototype.restore = function (state) {
        this.content = state && state.getContent();
    };
    return Editor;
}());
var EditorState = /** @class */ (function () {
    function EditorState(content) {
        this.content = content;
    }
    EditorState.prototype.getContent = function () {
        return this.content;
    };
    return EditorState;
}());
var EditHistory = /** @class */ (function () {
    function EditHistory() {
        this.states = [];
    }
    EditHistory.prototype.push = function (state) {
        this.states.push(state);
    };
    EditHistory.prototype.pop = function () {
        if (this.states.length === 0) {
            return null;
        }
        return this.states.pop();
    };
    return EditHistory;
}());
var editor = new Editor();
var editHistory = new EditHistory();
editor.setContent("a");
editHistory.push(editor.createState());
editor.setContent("b");
editHistory.push(editor.createState());
editor.setContent("c");
editor.restore(editHistory.pop());
editor.restore(editHistory.pop());
editor.restore(editHistory.pop());
console.log(editor.getContent());
