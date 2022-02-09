class Subject {
  num = 0;
  observers = [];
  constructor() {}

  addObserver(observer) {
    this.observers.push(observer);
  }

  deleteObserver(observer) {
    const i = this.observers.indexOf(observer);
    if (i > -1) {
      this.observers.splice(i, 1);
    }
  }

  notifyObservers() {
    this.num = Math.floor(Math.random() * 50);
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update(this);
    }
  }

  getNum() {
    return this.num;
  }
}

class StarObserver {
  update(subject) {
    console.log(`***${subject.getNum()}***`);
  }
}

class SharpObserver {
  update(subject) {
    console.log(`###${subject.getNum()}###`);
  }
}

const subject = new Subject();
const ob1 = new StarObserver();
const ob2 = new SharpObserver();
subject.addObserver(ob1);
subject.addObserver(ob2);

subject.notifyObservers();
subject.notifyObservers();
subject.notifyObservers();
subject.deleteObserver(ob1);
subject.notifyObservers();
