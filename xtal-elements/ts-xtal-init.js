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
        var TSXtalInit = (function (_super) {
            __extends(TSXtalInit, _super);
            function TSXtalInit() {
                _super.apply(this, arguments);
                this.isDecoratorElement = true;
            }
            TSXtalInit.prototype.attached = function () {
                var _this = this;
                var actions = crystal.evalInner(this, true);
                var target = crystal.nextNonScriptSibling(this);
                if (target && target['set']) {
                    this.processTarget(target, actions);
                }
                else {
                    this.async(function () {
                        target = crystal.nextDomBindElement(_this);
                        _this.processTarget(target, actions);
                    }, 1);
                }
            };
            TSXtalInit.prototype.processTarget = function (target, actions) {
                if (this.innerTarget) {
                    target = target.querySelector(this.innerTarget);
                }
                crystal.performCustElActions(actions, target);
            };
            __decorate([
                property()
            ], TSXtalInit.prototype, "innerTarget", void 0);
            __decorate([
                property()
            ], TSXtalInit.prototype, "isDecoratorElement", void 0);
            TSXtalInit = __decorate([
                component(crystal.tsXtalInitTagName),
                template("<span style=\"display: none\">iah</span>")
            ], TSXtalInit);
            return TSXtalInit;
        }(polymer.Base));
        TSXtalInit.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=ts-js-xtal-init.js.js.map