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
        let XtalLabel = class XtalLabel extends polymer.Base {
            attached() {
                const label = crystal.readStringConstant(this);
                const label2 = `${crystal.labelTagName}-${label}`;
                const target = crystal.nextNonScriptSibling(this);
                this.toggleClass(label2, true, target);
                const cachedObj = crystal.cachedObjects[label];
                if (cachedObj) {
                    target.set(cachedObj.path, cachedObj.val);
                }
            }
        };
        XtalLabel = __decorate([
            component(crystal.labelTagName, 'script'), 
            __metadata('design:paramtypes', [])
        ], XtalLabel);
        XtalLabel.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-label.js.map