class Banner {
  string;

  constructor(string) {
    this.string = string;
  }

  showWithParen() {
    console.log("(" + this.string + ")");
  }

  showWithAster() {
    console.log("*" + this.string + "*");
  }
}

class Print extends Banner {
  constructor(string) {
    super(string);
  }

  printWeak() {
    throw new Error("can not call directly");
  }

  printStrong() {
    throw new Error("can not call directly");
  }
}

class PrintBanner extends Print {
  constructor(string) {
    super(string);
  }

  printWeak() {
    this.showWithParen();
  }

  printStrong() {
    this.showWithAster();
  }
}

let p = new PrintBanner("Hello");
p.printWeak();
p.printStrong();
