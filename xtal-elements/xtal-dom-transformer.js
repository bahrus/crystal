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
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        //Be able to specify a DOM serializer for inner content of custom element. #6 https://github.com/bahrus/crystal/issues/6
        var XtalDOMTransformer = (function (_super) {
            __extends(XtalDOMTransformer, _super);
            function XtalDOMTransformer() {
                _super.apply(this, arguments);
            }
            XtalDOMTransformer.prototype.attached = function () {
                var _this = this;
                var target = crystal.nextNonScriptSibling(this);
                this.async(function () {
                    var targetChildren = Polymer.dom(target)['getEffectiveChildNodes']();
                    var actions = crystal.evalInner(_this);
                    for (var j = 0, jj = actions.length; j < jj; j++) {
                        var action = actions[j];
                        action(targetChildren, target);
                    }
                }, 1);
            };
            XtalDOMTransformer = __decorate([
                component('xtal-dom-transformer', 'script'), 
                __metadata('design:paramtypes', [])
            ], XtalDOMTransformer);
            return XtalDOMTransformer;
        })(polymer.Base);
        XtalDOMTransformer.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-dom-transformer.js.map