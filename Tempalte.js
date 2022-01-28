class AbstractDisplay {
  open() {
    throw new Error("can not call directly");
  }

  print() {
    throw new Error("can not call directly");
  }

  close() {
    throw new Error("can not call directly");
  }
  display() {
    this.open();
    for (let i = 0; i < 5; i++) {
      this.print();
    }
    this.close();
  }
}

class CharDisplay extends AbstractDisplay {
  char;

  constructor(char) {
    super();
    this.char = char;
  }

  open() {
    process.stdout.write("<<");
  }

  print() {
    process.stdout.write(this.char);
  }

  close() {
    console.log(">>");
  }
}

class StringDisplay extends AbstractDisplay {
  str;
  width;

  constructor(str) {
    super();
    this.str = str;
    this.width = str.length;
  }

  open() {
    this.printLine();
  }

  print() {
    console.log(`|${this.str}|`);
  }

  close() {
    this.printLine();
  }

  printLine() {
    process.stdout.write("+");
    for (let i = 0; i < this.width; i++) {
      process.stdout.write("-");
    }
    console.log("+");
  }
}

let charDisplay = new CharDisplay("H");
charDisplay.display();

let strDisplay = new StringDisplay("Hello, World!");
strDisplay.display();
