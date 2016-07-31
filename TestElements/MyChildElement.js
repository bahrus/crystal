/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
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
    let MyChildElement = class MyChildElement extends polymer.Base {
    };
    MyChildElement = __decorate([
        component("my-child-element"),
        template(`
        <div style="background-color:#eeee77;left:30px;position:relative;width:500px">
            <div>My Child component</div>
            <div>myProp: [[myProp]]</div>
        </div>
    `), 
        __metadata('design:paramtypes', [])
    ], MyChildElement);
    MyChildElement.register();
})(TestElements || (TestElements = {}));
//# sourceMappingURL=MyChildElement.js.map