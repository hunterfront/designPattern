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

//将状态 和 状态历史的记录 抽取出来,每个类单独负责一项工作,符合单一责任原则
class Editor {
  private content: string;

  setContent(content: string) {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }

  createState(): EditorState {
    return new EditorState(this.content);
  }

  restore(state: EditorState) {
    this.content = state && state.getContent();
  }
}

class EditorState {
  private readonly content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }
}

class EditHistory {
  private states: EditorState[] = [];

  push(state: EditorState) {
    this.states.push(state);
  }

  pop(): EditorState {
    if (this.states.length === 0) {
      return null;
    }
    return this.states.pop();
  }
}

let editor = new Editor();
let editHistory = new EditHistory();
editor.setContent("a");
editHistory.push(editor.createState());

editor.setContent("b");
editHistory.push(editor.createState());

editor.setContent("c");
editor.restore(editHistory.pop());
editor.restore(editHistory.pop());
editor.restore(editHistory.pop());

console.log(editor.getContent());
