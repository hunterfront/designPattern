var ImageStorage = /** @class */ (function () {
    function ImageStorage() {
    }
    // private compresser: Compresser;
    // private filter: Filter;
    // constructor(compresser: Compresser, filter: Filter) {
    //   this.compresser = compresser;
    //   this.filter = filter;
    // }
    ImageStorage.prototype.store = function (fileName, compresser, filter) {
        compresser.compress(fileName);
        filter.apply(fileName);
    };
    return ImageStorage;
}());
var PngCompresser = /** @class */ (function () {
    function PngCompresser() {
    }
    PngCompresser.prototype.compress = function (fileName) {
        console.log("png compress " + fileName);
    };
    return PngCompresser;
}());
var JpegCompresser = /** @class */ (function () {
    function JpegCompresser() {
    }
    JpegCompresser.prototype.compress = function (fileName) {
        console.log("jpeg compress " + fileName);
    };
    return JpegCompresser;
}());
var BlackAndWhiteFilter = /** @class */ (function () {
    function BlackAndWhiteFilter() {
    }
    BlackAndWhiteFilter.prototype.apply = function (fileName) {
        console.log("balck and white filter " + fileName);
    };
    return BlackAndWhiteFilter;
}());
var MovieFilter = /** @class */ (function () {
    function MovieFilter() {
    }
    MovieFilter.prototype.apply = function (fileName) {
        console.log("movie filter " + fileName);
    };
    return MovieFilter;
}());
var imageStorage = new ImageStorage();
imageStorage.store("aa", new JpegCompresser(), new BlackAndWhiteFilter());
