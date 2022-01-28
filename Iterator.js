class Aggregate {
  constructor() {}

  iterator() {
    throw new Error("can not call directly");
  }
}

class Iterator {
  constructor() {}

  hasNext() {
    throw new Error("can not call directly");
  }

  next() {
    throw new Error("can not call directly");
  }
}

class BookShelf extends Aggregate {
  books;
  last = 0;

  constructor(maxSize) {
    super();
    this.books = new Array(maxSize);
  }

  getBookAt(index) {
    return books[index];
  }

  appendBook(book) {
    this.books[this.last] = book;
    this.last++;
  }

  getLength() {
    return this.last;
  }

  iterator() {
    return new BookShelfIterator(this);
  }
}

class BookShelfIterator extends Iterator {
  bookShelf;
  index;

  constructor(bookShelf) {
    super();
    this.bookShelf = bookShelf;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.bookShelf.getLength();
  }

  next() {
    return this.bookShelf.books[this.index++];
  }
}

class Book {
  name;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

let bookShelf = new BookShelf(10);
bookShelf.appendBook(new Book("shu 1"));
bookShelf.appendBook(new Book("shu 2"));
bookShelf.appendBook(new Book("shu 3"));
bookShelf.appendBook(new Book("shu 4"));
bookShelf.appendBook(new Book("shu 5"));
bookShelf.appendBook(new Book("shu 6"));
bookShelf.appendBook(new Book("shu 7"));
bookShelf.appendBook(new Book("shu 8"));
bookShelf.appendBook(new Book("shu 9"));
bookShelf.appendBook(new Book("shu 10"));

let bookShelfIterator = bookShelf.iterator();

while (bookShelfIterator.hasNext()) {
  console.log(bookShelfIterator.next().getName());
}
