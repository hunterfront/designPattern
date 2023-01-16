/**
 * Commond Pattern：invoker通过将行为委托给Commond，commond再委托给具体实现类。将Commond抽离出来方便历史管理，以及回退操作；
 * 与Memonto相比，记录的是命令而不是snapshot，更加节省内存。
 */
var MakeBoldCommond = /** @class */ (function () {
    function MakeBoldCommond(htmlEditor, history) {
        this.htmlEditor = htmlEditor;
        this.history = history;
    }
    MakeBoldCommond.prototype.excute = function () {
        this.prevContent = this.htmlEditor.getContent();
        this.htmlEditor.makeBold();
        this.history.push(this);
    };
    MakeBoldCommond.prototype.unexcute = function () {
        this.htmlEditor.setContent(this.prevContent);
    };
    return MakeBoldCommond;
}());
var UndoCommond = /** @class */ (function () {
    function UndoCommond(history) {
        this.history = history;
    }
    UndoCommond.prototype.excute = function () {
        var last = this.history.pop();
        last.unexcute();
    };
    return UndoCommond;
}());
var EditHistory = /** @class */ (function () {
    function EditHistory() {
        this.history = [];
    }
    EditHistory.prototype.push = function (commond) {
        this.history.push(commond);
    };
    EditHistory.prototype.pop = function () {
        return this.history.pop();
    };
    return EditHistory;
}());
var HtmlEditor = /** @class */ (function () {
    function HtmlEditor() {
    }
    HtmlEditor.prototype.setContent = function (content) {
        this.content = content;
    };
    HtmlEditor.prototype.getContent = function () {
        return this.content;
    };
    HtmlEditor.prototype.makeBold = function () {
        this.content = "<b>".concat(this.content, "<b/>");
    };
    return HtmlEditor;
}());
var editor = new HtmlEditor();
editor.setContent("hello world");
var h = new EditHistory();
var c = new MakeBoldCommond(editor, h);
c.excute();
var undo = new UndoCommond(h);
undo.excute();
console.log(editor.getContent());
