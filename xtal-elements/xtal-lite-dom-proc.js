///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        //Be able to specify a DOM serializer for inner content of custom element. #6 https://github.com/bahrus/crystal/issues/6
        let XtalDOMTransformer = class XtalDOMTransformer extends polymer.Base {
            attached() {
                const target = crystal.nextNonScriptSibling(this);
                this.async(() => {
                    const targetChildren = Polymer.dom(target)['getEffectiveChildNodes']();
                    const actions = crystal.evalInner(this);
                    for (let j = 0, jj = actions.length; j < jj; j++) {
                        const action = actions[j];
                        action(targetChildren, target);
                    }
                }, 1);
            }
        };
        XtalDOMTransformer = __decorate([
            component('xtal-lite-dom-proc', 'script'), 
            __metadata('design:paramtypes', [])
        ], XtalDOMTransformer);
        XtalDOMTransformer.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-lite-dom-proc.js.map