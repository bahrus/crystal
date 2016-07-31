///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>
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
        let JSXtalInit = class JSXtalInit extends polymer.Base {
            attached() {
                const actions = crystal.evalInner(this);
                let target = crystal.nextNonScriptSibling(this);
                if (target && target['set']) {
                    this.processTarget(target, actions);
                }
                else {
                    this.async(() => {
                        target = crystal.nextDomBindElement(this);
                        this.processTarget(target, actions);
                    }, 1);
                }
            }
            processTarget(target, actions) {
                if (this.innerTarget) {
                    target = target.querySelector(this.innerTarget);
                }
                crystal.performCustElActions(actions, target);
            }
        };
        __decorate([
            property()
        ], JSXtalInit.prototype, "innerTarget", void 0);
        JSXtalInit = __decorate([
            component(crystal.jsXtaInitTagName),
            template(`<span style="display: none">iah</span>`)
        ], JSXtalInit);
        //function performActions(
        JSXtalInit.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=js-xtal-init.js.map