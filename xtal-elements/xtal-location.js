///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>
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
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        var XtalLocation = (function (_super) {
            __extends(XtalLocation, _super);
            function XtalLocation() {
                _super.apply(this, arguments);
                this.lhsMarker = 'xtal=';
                this.rhsMarker = '/*=xtal*/';
            }
            XtalLocation.prototype.beginTransaction = function () {
            };
            XtalLocation.prototype.endTransaction = function () {
            };
            XtalLocation.prototype.onValueChange = function (changeRecord) {
                debugger;
            };
            XtalLocation.prototype.attached = function () {
                debugger;
            };
            __decorate([
                property()
            ], XtalLocation.prototype, "lhsMarker", void 0);
            __decorate([
                property()
            ], XtalLocation.prototype, "rhsMarker", void 0);
            __decorate([
                property({
                    type: Object
                })
            ], XtalLocation.prototype, "values", void 0);
            __decorate([
                observe('values.*')
            ], XtalLocation.prototype, "onValueChange", null);
            XtalLocation = __decorate([
                component('xtal-location')
            ], XtalLocation);
            return XtalLocation;
        }(polymer.Base));
        XtalLocation.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-location.js.map