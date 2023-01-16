var BrowserHistory = /** @class */ (function () {
    function BrowserHistory() {
        this.urls = [];
    }
    BrowserHistory.prototype.push = function (url) {
        this.urls.push(url);
    };
    BrowserHistory.prototype.pop = function () {
        return this.urls.pop();
    };
    BrowserHistory.prototype.getUrls = function () {
        return this.urls;
    };
    BrowserHistory.prototype.createIterator = function () {
        return new BrowserHistoryIterator(this.urls);
    };
    return BrowserHistory;
}());
var BrowserHistoryIterator = /** @class */ (function () {
    function BrowserHistoryIterator(urls) {
        this.index = 0;
        this.urls = urls;
    }
    BrowserHistoryIterator.prototype.hasNext = function () {
        return this.index < this.urls.length;
    };
    BrowserHistoryIterator.prototype.next = function () {
        var url = this.urls[this.index];
        this.index++;
        return url;
    };
    return BrowserHistoryIterator;
}());
var browserHistory = new BrowserHistory();
browserHistory.push("url1");
browserHistory.push("url2");
browserHistory.push("url3");
browserHistory.push("url4");
var browserHistoryIterator = browserHistory.createIterator();
while (browserHistoryIterator.hasNext()) {
    console.log(browserHistoryIterator.next());
}
