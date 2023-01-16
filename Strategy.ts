/**
 * Strategy模式与State模式相比
 * 不同: State模式只有一个状态成员变量, Strategy模式有多个行为不同的成员变量, 具体的实现class可以组合使用;
 * 相同: 都是将具体行为作为单独的类,并利用了interface来实现多态, 方便拓展功能;
 */

class ImageStorage {
  // 将具体行为类的实现通过变量的方式传进函数使用,比当作成员变量耦合度更低, 一个类可以对同一对象通过传参的变化进行不同的处理.
  // private compresser: Compresser;
  // private filter: Filter;

  // constructor(compresser: Compresser, filter: Filter) {
  //   this.compresser = compresser;
  //   this.filter = filter;
  // }

  store(fileName: string, compresser: Compresser, filter: Filter) {
    compresser.compress(fileName);
    filter.apply(fileName);
  }
}

interface Compresser {
  compress(fileName: string): void;
}

class PngCompresser implements Compresser {
  compress(fileName: string): void {
    console.log("png compress " + fileName);
  }
}

class JpegCompresser implements Compresser {
  compress(fileName: string): void {
    console.log("jpeg compress " + fileName);
  }
}

interface Filter {
  apply(fileName: string): void;
}

class BlackAndWhiteFilter implements Filter {
  apply(fileName: string): void {
    console.log("balck and white filter " + fileName);
  }
}

class MovieFilter implements Filter {
  apply(fileName: string): void {
    console.log("movie filter " + fileName);
  }
}

const imageStorage: ImageStorage = new ImageStorage();
imageStorage.store("aa", new JpegCompresser(), new BlackAndWhiteFilter());
