const { stdout } = require("process");
const { open } = require("fs/promises");
const readline = require("readline");

class Display {
  impl;

  constructor(impl) {
    this.impl = impl;
  }

  async open() {
    await this.impl.rawOpen();
  }

  async print() {
    await this.impl.rawPrint();
  }

  async close() {
    await this.impl.rawClose();
  }

  async display() {
    await this.open();
    await this.print();
    await this.close();
  }
}

class CountDisplay extends Display {
  constructor(impl) {
    super(impl);
  }

  async multiDisplay(times) {
    await this.open();
    for (let i = 0; i < times; i++) {
      await this.print();
    }
    await this.close();
  }
}

class DisplayImpl {
  rawOpen() {
    throw new Error("can not call directly");
  }

  rawPrint() {
    throw new Error("can not call directly");
  }

  rawClose() {
    throw new Error("can not call directly");
  }
}

class StringDisplayImpl extends DisplayImpl {
  str;
  width;

  constructor(str) {
    super();
    this.str = str;
    this.width = str.length;
  }

  async rawOpen() {
    this.printLine();
  }

  async rawPrint() {
    console.log(`|${this.str}|`);
  }

  async rawClose() {
    this.printLine();
  }

  printLine() {
    stdout.write("+");
    for (let i = 0; i < this.width; i++) {
      stdout.write("-");
    }
    console.log("+");
  }
}

class RandomDisplay extends CountDisplay {
  constructor(impl) {
    super(impl);
  }

  async randomDisplay(times) {
    const randomTimes = Math.floor(Math.random() * (times + 1));
    await this.multiDisplay(randomTimes);
  }
}

class IncreaseDisplay extends CountDisplay {
  step;
  constructor(impl, step) {
    super(impl);
    this.step = step;
  }

  async increaseDisplay(level) {
    let count = 0;
    for (let i = 0; i < level; i++) {
      await this.multiDisplay(count);
      count += this.step;
    }
  }
}

class CharDisplayImpl extends DisplayImpl {
  head;
  body;
  foot;
  constructor(head, body, foot) {
    super();
    this.head = head;
    this.body = body;
    this.foot = foot;
  }

  async rawOpen() {
    stdout.write(this.head);
  }

  async rawPrint() {
    stdout.write(this.body);
  }

  async rawClose() {
    console.log(this.foot);
  }
}

class FileDisplayImpl extends DisplayImpl {
  filename;
  constructor(filename) {
    super();
    this.filename = filename;
  }

  async rawOpen() {
    console.log(`--------------------${this.filename}--------------------`);
  }

  async rawPrint() {
    let fd;
    try {
      fd = await open(this.filename);
      const rl = readline.createInterface({
        input: fd.createReadStream(),
        crlfDelay: Infinity,
      });
      for await (const line of rl) {
        console.log(line);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async rawClose() {
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=");
  }
}

let d1 = new Display(new StringDisplayImpl("hello, china"));
let d2 = new Display(new StringDisplayImpl("hello, world"));
let d3 = new CountDisplay(new StringDisplayImpl("hello, universe"));
let d4 = new RandomDisplay(new StringDisplayImpl("hello, stars"));
let d5 = new IncreaseDisplay(new CharDisplayImpl("<", "*", ">"), 1);
let d6 = new IncreaseDisplay(new CharDisplayImpl("|", "#", "-"), 2);
let d7 = new CountDisplay(new FileDisplayImpl("./test.txt"));

d1.display();
d2.display();
d3.multiDisplay(4);
d4.randomDisplay(7);
d5.increaseDisplay(5);
d6.increaseDisplay(5);
d7.multiDisplay(4);
