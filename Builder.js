class Builder {
  makeTitle(title) {
    throw new Error("can not call directly");
  }

  makeString(str) {
    throw new Error("can not call directly");
  }

  makeItems(items) {
    throw new Error("can not call directly");
  }

  close() {
    throw new Error("can not call directly");
  }
}

class TextBuilder extends Builder {
  str = "";
  constructor() {
    super();
  }

  makeTitle(title) {
    this.str += "=========================================\n";
    this.str += "《" + title + "》\n";
    this.str += "\n";
  }

  makeString(str) {
    this.str += "■" + str + "\n";
    this.str += "\n";
  }

  makeItems(items) {
    for (let i = 0; i < items.length; i++) {
      this.str += "  ·" + items[i] + "\n";
    }
    this.str += "\n";
  }

  close() {
    this.str += "==========================================\n";
  }

  getResult() {
    return this.str;
  }
}

let fs = require("fs");

class HTMLBuilder extends Builder {
  filename;
  fs;

  constructor() {
    super();
  }

  makeTitle(title) {
    this.filename = title + ".html";
    fs.appendFileSync(
      this.filename,
      `<html><head><title>${title}</title></head><body>`
    );
    fs.appendFileSync(this.filename, `<h1>${title}</h1>`);
  }

  makeString(str) {
    fs.appendFileSync(this.filename, `<p>${str}</p>`);
  }

  makeItems(items) {
    fs.appendFileSync(this.filename, `<ul>`);
    for (let i = 0; i < items.length; i++) {
      fs.appendFileSync(this.filename, `<li>${items[i]}</li>`);
    }
    fs.appendFileSync(this.filename, `</ul>`);
  }

  close() {
    fs.appendFileSync(this.filename, `</body></html>`);
  }

  getResult() {
    return this.filename;
  }
}

class Director {
  builder;

  constructor(builder) {
    this.builder = builder;
  }

  construct() {
    this.builder.makeTitle("Greeting");
    this.builder.makeString("从早上至下午");
    this.builder.makeItems(["早上好。", "下午好。"]);
    this.builder.makeString("晚上");
    this.builder.makeItems(["晚上好", "晚安", "再见。"]);
    this.builder.close();
  }
}

// let builder = new TextBuilder();
let builder = new HTMLBuilder();

let director = new Director(builder);
director.construct();
console.log(builder.getResult());
