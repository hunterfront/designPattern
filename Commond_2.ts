/**
 * Commond Pattern：invoker通过将行为委托给Commond，commond再委托给具体实现类。将Commond抽离出来方便历史管理，以及回退操作；
 * 与Memonto相比，记录的是命令而不是snapshot，更加节省内存。
 */

interface Commond {
  excute(): void;
}

interface UndoableCommond extends Commond {
  unexcute(): void;
}

class MakeBoldCommond implements UndoableCommond {
  private prevContent: string;
  private htmlEditor: HtmlEditor;
  private history: EditHistory;

  constructor(htmlEditor: HtmlEditor, history: EditHistory) {
    this.htmlEditor = htmlEditor;
    this.history = history;
  }

  excute(): void {
    this.prevContent = this.htmlEditor.getContent();
    this.htmlEditor.makeBold();
    this.history.push(this);
  }
  unexcute(): void {
    this.htmlEditor.setContent(this.prevContent);
  }
}

class UndoCommond implements Commond {
  private history: EditHistory;

  constructor(history: EditHistory) {
    this.history = history;
  }

  excute(): void {
    if (this.history.size() > 0) this.history.pop().unexcute();
  }
}

class EditHistory {
  private history: UndoableCommond[] = [];

  push(commond: UndoableCommond) {
    this.history.push(commond);
  }

  pop(): UndoableCommond {
    return this.history.pop();
  }

  size() {
    return this.history.length;
  }
}

class HtmlEditor {
  private content: string;

  setContent(content: string) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  makeBold() {
    this.content = `<b>${this.content}<b/>`;
  }
}

const editor = new HtmlEditor();
editor.setContent("hello world");
const h = new EditHistory();

const c = new MakeBoldCommond(editor, h);
c.excute();

const undo = new UndoCommond(h);
undo.excute();

console.log(editor.getContent());
