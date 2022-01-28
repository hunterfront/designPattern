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

class Print {
  printWeak() {
    throw new Error("can not call directly");
  }

  printStrong() {
    throw new Error("can not call directly");
  }
}

class PrintBanner extends Print {
  banner;

  constructor(string) {
    super();
    this.banner = new Banner(string);
  }

  printWeak() {
    this.banner.showWithParen();
  }

  printStrong() {
    this.banner.showWithAster();
  }
}

let p = new PrintBanner("Hello");
p.printWeak();
p.printStrong();
