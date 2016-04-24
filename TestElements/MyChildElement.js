/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TestElements;
(function (TestElements) {
    var MyChildElement = (function (_super) {
        __extends(MyChildElement, _super);
        function MyChildElement() {
            _super.apply(this, arguments);
        }
        MyChildElement = __decorate([
            component("my-child-element"),
            template("\n        <div style=\"background-color:#eeee77;left:30px;position:relative;width:500px\">\n            <div>My Child component</div>\n            <div>myProp: [[myProp]]</div>\n        </div>\n    ")
        ], MyChildElement);
        return MyChildElement;
    }(polymer.Base));
    MyChildElement.register();
})(TestElements || (TestElements = {}));
//# sourceMappingURL=MyChildElement.js.map