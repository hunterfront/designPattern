class Product {
  use() {
    throw new Error("can not call directly");
  }

  createClone() {
    throw new Error("can not call directly");
  }
}

class UnderlinePen extends Product {
  ulchar;

  constructor(ulchar) {
    super();
    this.ulchar = ulchar;
  }

  use(s) {
    let len = s.length;
    console.log('"' + s + '"');
    process.stdout.write(" ");
    for (let i = 0; i < len; i++) {
      process.stdout.write(this.ulchar);
    }
    console.log("");
  }

  createClone() {
    let copy = JSON.parse(JSON.stringify(this));
    Object.setPrototypeOf(copy, this.__proto__);
    return copy;
  }
}

class MessageBox extends Product {
  decochar;

  constructor(decochar) {
    super();
    this.decochar = decochar;
  }

  use(s) {
    let len = s.length;
    for (let i = 0; i < len + 4; i++) {
      process.stdout.write(this.decochar);
    }
    console.log("");
    console.log(this.decochar + " " + s + " " + this.decochar);
    for (let i = 0; i < len + 4; i++) {
      process.stdout.write(this.decochar);
    }
    console.log("");
  }

  createClone() {
    let copy = JSON.parse(JSON.stringify(this));
    Object.setPrototypeOf(copy, this.__proto__);
    return copy;
  }
}

class Manager {
  showcase = new Map();

  register(name, proto) {
    this.showcase.set(name, proto);
  }

  create(protoname) {
    let p = this.showcase.get(protoname);
    return p.createClone();
  }
}

let m = new Manager();
m.register("a", new UnderlinePen("-"));
m.register("b", new MessageBox("*"));

let a = m.create("a");
let b = m.create("b");
console.log(a);

a.use("hello, world");
b.use("hello, world");
