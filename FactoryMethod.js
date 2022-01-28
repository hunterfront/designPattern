class Factory {
  create(owner) {
    let p = this.createProduct(owner);
    this.registerProduct(p);
    return p;
  }

  createProduct(owner) {
    throw new Error("can not call directly");
  }

  registerProduct(product) {
    throw new Error("can not call directly");
  }
}

class Product {
  use() {
    throw new Error("can not call directly");
  }
}

class IDCardFactory extends Factory {
  map = new Map();
  no = 1;
  constructor() {
    super();
  }

  createProduct(owner) {
    console.log(`create ${owner}'s idCard`);
    return new IDCard(owner, this.no++);
  }

  registerProduct(idCard) {
    this.map.set(idCard.getNo(), idCard.getOwner());
  }

  getOwnersMap() {
    return this.map;
  }
}

class IDCard extends Product {
  owner;
  no;

  constructor(owner, no) {
    super();
    this.owner = owner;
    this.no = no;
  }

  use() {
    console.log(`use ${this.owner}'s idCard`);
  }

  getOwner() {
    return this.owner;
  }

  getNo() {
    return this.no;
  }
}

let iDCardFactory = new IDCardFactory();
iDCardFactory.create("wuhantao").use();
iDCardFactory.create("wuhantao1").use();
iDCardFactory.create("wuhantao2").use();
iDCardFactory.create("wuhantao3").use();

console.log(iDCardFactory.getOwnersMap());
