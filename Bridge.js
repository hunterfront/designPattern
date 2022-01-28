const { time } = require("console");
const { stdout } = require("process");

class Display {
  impl;

  constructor(impl) {
    this.impl = impl;
  }

  open() {
    this.impl.rawOpen();
  }

  print() {
    this.impl.rawPrint();
  }

  close() {
    this.impl.rawClose();
  }

  display() {
    this.open();
    this.print();
    this.close();
  }
}

class CountDisplay extends Display {
  constructor(impl) {
    super(impl);
  }

  multiDisplay(times) {
    this.open();
    for (let i = 0; i < times; i++) {
      this.print();
    }
    this.close();
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

  rawOpen() {
    this.printLine();
  }

  rawPrint() {
    console.log(`|${this.str}|`);
  }

  rawClose() {
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

  randomDisplay(times) {
    const randomTimes = Math.floor(Math.random() * (times + 1));
    this.multiDisplay(randomTimes);
  }
}

class IncreaseDisplay extends CountDisplay {
  step;
  constructor(impl, step) {
    super(impl);
    this.step = step;
  }

  increaseDisplay(level) {
    let count = 0;
    for (let i = 0; i < level; i++) {
      this.multiDisplay(count);
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

  rawOpen() {
    stdout.write(this.head);
  }

  rawPrint() {
    stdout.write(this.body);
  }

  rawClose() {
    console.log(this.foot);
  }
}

let d1 = new Display(new StringDisplayImpl("hello, china"));
let d2 = new Display(new StringDisplayImpl("hello, world"));
let d3 = new CountDisplay(new StringDisplayImpl("hello, universe"));
let d4 = new RandomDisplay(new StringDisplayImpl("hello, stars"));
let d5 = new IncreaseDisplay(new CharDisplayImpl("<", "*", ">"), 1);
let d6 = new IncreaseDisplay(new CharDisplayImpl("|", "#", "-"), 2);

d1.display();
d2.display();
d3.multiDisplay(4);
d4.randomDisplay(7);
d5.increaseDisplay(5);
d6.increaseDisplay(5);
