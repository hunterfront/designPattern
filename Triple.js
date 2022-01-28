class Triple {
  static MAX = 3;
  static count = 0;
  no;

  constructor() {
    console.log("生成了一个实例");
  }

  static getInstance() {
    if (this.count < this.MAX) {
      let t = new Triple();
      t.no = this.count;
      this.count++;
      return t;
    } else {
      throw new Error("最多生成3个");
    }
  }
}

let a = Triple.getInstance();
console.log(a);
let b = Triple.getInstance();
console.log(b);
let c = Triple.getInstance();
console.log(c);
