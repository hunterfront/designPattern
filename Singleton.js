// 饿汉
class Singleton {
  static singleton = new Singleton();

  constructor() {
    console.log("生成了一个实例");
  }

  static getInstance() {
    return this.singleton;
  }
}

// 懒汉
class Singleton {
  static singleton;

  constructor() {
    console.log("生成了一个实例");
  }

  static getInstance() {
    if (!this.singleton) {
      this.singleton = new Singleton();
    }
    return this.singleton;
  }
}

let a = Singleton.getInstance();
let b = Singleton.getInstance();
console.log(a === b);
