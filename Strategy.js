class Hand {
  static hands = [new Hand(0), new Hand(1), new Hand(2)];
  names = ["石头", "剪刀", "布"];
  handval;
  constructor(handval) {
    this.handval = handval;
  }

  static getHand(handval) {
    return this.hands[handval];
  }

  isStrongerThan(hand) {
    return (this.handval + 1) % 3 === hand.handval;
  }

  toString() {
    return this.names[this.handval];
  }
}

class Strategy {
  nextHand() {
    throw new Error("can not call directly");
  }

  study(win) {
    throw new Error("can not call directly");
  }
}

class RandomStrategy extends Strategy {
  constructor() {
    super();
  }
  nextHand() {
    return Hand.getHand(Math.floor(Math.random() * 3));
  }
  study(win) {}
}

class WinStrategy extends Strategy {
  won = false;
  prevHand;

  constructor() {
    super();
  }

  nextHand() {
    if (!this.won) {
      this.prevHand = Hand.getHand(Math.floor(Math.random() * 3));
    }
    return this.prevHand;
  }

  study(win) {
    this.won = win;
  }
}

class ProbStrategy extends Strategy {
  prevHandval = 0;
  curHandval = 0;
  history = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  constructor() {
    super();
  }

  nextHand() {
    let bet = Math.floor(Math.random() * this.getSum(this.curHandval));
    let handval;
    if (bet < this.history[this.curHandval][0]) {
      this.history[this.curHandval][0]++;
      handval = 0;
    } else if (
      bet <
      this.history[this.curHandval][0] + this.history[this.curHandval][1]
    ) {
      this.history[this.curHandval][1]++;
      handval = 1;
    } else {
      this.history[this.curHandval][2]++;
      handval = 2;
    }
    this.prevHandval = this.curHandval;
    this.curHandval = handval;
    return Hand.getHand(handval);
  }

  getSum(handval) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.history[handval][i];
    }
    return sum;
  }

  study(win) {
    if (win) {
      this.history[this.prevHandval][this.curHandval]++;
    } else {
      this.history[this.prevHandval][(this.curHandval + 1) % 3]++;
      this.history[this.prevHandval][(this.curHandval + 2) % 3]++;
    }
  }
}

class Player {
  name;
  strategy;
  wincount = 0;
  losecount = 0;
  gamecount = 0;
  constructor(name, strategy) {
    this.name = name;
    this.strategy = strategy;
  }

  nextHand() {
    return this.strategy.nextHand();
  }

  win() {
    this.strategy.study(true);
    this.wincount++;
    this.gamecount++;
  }

  lose() {
    this.strategy.study(false);
    this.losecount++;
    this.gamecount++;
  }

  even() {
    this.gamecount++;
  }

  toString() {
    return `[${this.name}: ${this.gamecount} games, ${this.wincount} win, ${this.losecount} lose]`;
  }
}

// const player1 = new Player("Taro", new WinStrategy());
const player1 = new Player("Taro", new RandomStrategy());
const player2 = new Player("Hana", new ProbStrategy());

for (let i = 0; i < 10000; i++) {
  nextHand1 = player1.nextHand();
  nextHand2 = player2.nextHand();
  if (nextHand1.isStrongerThan(nextHand2)) {
    console.log("Winner:" + player1);
    player1.win();
    player2.lose();
  } else if (nextHand2.isStrongerThan(nextHand1)) {
    console.log("Winner:" + player2);
    player2.win();
    player1.lose();
  } else {
    console.log("Even...");
    player1.even();
    player2.even();
  }
}

console.log("Total result:");
console.log(player1.toString());
console.log(player2.toString());
