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
        //Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
        var XtalInit = (function (_super) {
            __extends(XtalInit, _super);
            function XtalInit() {
                _super.apply(this, arguments);
            }
            XtalInit.prototype.attached = function () {
                var _this = this;
                var actions = crystal.evalInner(this);
                var target = crystal.nextNonScriptSibling(this);
                if (target && target.set) {
                    console.log('found target');
                    console.log(target['outerHTML']);
                    this.processTarget(target, actions);
                }
                else {
                    this.async(function () {
                        target = crystal.nextDomBindElement(_this);
                        debugger;
                        _this.processTarget(target, actions);
                    }, 1);
                }
            };
            XtalInit.prototype.processTarget = function (target, actions) {
                if (this.innerTarget) {
                    target = target.querySelector(this.innerTarget);
                }
                crystal.performCustElActions(actions, target);
            };
            __decorate([
                property()
            ], XtalInit.prototype, "innerTarget", void 0);
            XtalInit = __decorate([
                component('xtal-init', 'script')
            ], XtalInit);
            return XtalInit;
        }(polymer.Base));
        //function performActions(
        XtalInit.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-init.js.map