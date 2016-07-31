/**
 * Created by Bruce on 4/17/2016.
 */
function map(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
}
var myArray = ['hello', 'world'];
var myHTML = "\n    <ul>\n                                " + (_a = ["\n        <li>", "</li>\n                                "], _a.raw = ["\n        <li>", "</li>\n                                "], [myArray.map,](_a, s)) + ".join('')}\n    </ul>\n";
var mapper = {
    from: myArray,
};
var myHTML2 = "\n    <ul>\n                                " + (mapper.select = function (s) { return ("\n        <li>" + s + "</li>\n                                "); });
(_b = [";"], _b.raw = [""], (/ul>)(_b));
var _a, _b;
//# sourceMappingURL=scratch.js.map