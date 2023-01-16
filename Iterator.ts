class BrowserHistory {
  private urls: string[] = [];

  push(url: string) {
    this.urls.push(url);
  }

  pop(): string {
    return this.urls.pop();
  }

  getUrls(): string[] {
    return this.urls;
  }

  createIterator(): MyIterator {
    return new BrowserHistoryIterator(this.urls);
  }
}

interface MyIterator {
  hasNext(): boolean;
  next(): unknown;
}

class BrowserHistoryIterator implements MyIterator {
  private index = 0;
  private urls: string[];

  constructor(urls) {
    this.urls = urls;
  }

  hasNext(): boolean {
    return this.index < this.urls.length;
  }

  next(): unknown {
    let url = this.urls[this.index];
    this.index++;
    return url;
  }
}

let browserHistory = new BrowserHistory();
browserHistory.push("url1");
browserHistory.push("url2");
browserHistory.push("url3");
browserHistory.push("url4");

let browserHistoryIterator: MyIterator = browserHistory.createIterator();

while (browserHistoryIterator.hasNext()) {
  console.log(browserHistoryIterator.next());
}
