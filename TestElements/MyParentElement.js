/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../crystal.ts"/>
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TestElements;
(function (TestElements) {
    //#region abbreviations
    function rn(getter) {
        return crystal.getName(getter);
    }
    var c = {
        'myProp': rn(function (o) { return o.myProp; }),
        'incrementMyProp': rn(function (o) { return o.incrementMyProp; }),
    };
    var MyParentModel = (function () {
        function MyParentModel() {
        }
        MyParentModel.prototype.incrementMyProp = function () {
            this.myProp++;
        };
        return MyParentModel;
    })();
    var MyParentElement = (function (_super) {
        __extends(MyParentElement, _super);
        function MyParentElement() {
            _super.apply(this, arguments);
            this.myProp = 42; // direct initialization
        }
        MyParentElement = __decorate([
            behavior(MyParentModel),
            component("my-parent-element"),
            template("\n        <div>myProp: [[" + c.myProp + "]]</div>\n        <div on-click=\"" + c.incrementMyProp + "\">Increment myProp</div>\n        <my-child-element></my-child-element>\n    "), 
            __metadata('design:paramtypes', [])
        ], MyParentElement);
        return MyParentElement;
    })(polymer.Base);
    MyParentElement.register();
})(TestElements || (TestElements = {}));
//# sourceMappingURL=MyParentElement.js.map