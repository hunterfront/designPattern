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

  isWeakerThan(hand) {
    return (this.handval + 1) % 3 !== hand.handval;
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
  prevHand = new Hand(0);
  curHand = new Hand(0);
  history = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  constructor() {
    super();
  }

  nextHand() {
    let bet = Math.floor(Math.random(this.getSum(this.curHand.handval)));
    let curHandval;
    if (bet < this.history[this.curHand.handval][0]) {
      this.history[this.curHand.handval][0]++;
      curHandval = 0;
    } else if (
      bet <
      this.history[this.curHand.handval][0] +
        this.history[this.curHand.handval][1]
    ) {
      this.history[this.curHand.handval][1]++;
      handval = 1;
    } else {
      this.history[this.curHand.handval][2]++;
      cruHandval = 2;
    }
    this.prevHand = this.curHand;
    this.curHand = Hand.getHand(curHandval);
    return this.curHand;
  }

  getSum(handval) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += this.history[handval][i];
    }
    return sum;
  }
}
