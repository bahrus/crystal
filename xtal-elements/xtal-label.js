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
        var XtalLabel = (function (_super) {
            __extends(XtalLabel, _super);
            function XtalLabel() {
                _super.apply(this, arguments);
            }
            XtalLabel.prototype.attached = function () {
                var label = crystal.readStringConstant(this);
                var label2 = crystal.labelTagName + "-" + label;
                var target = crystal.nextNonScriptSibling(this);
                this.toggleClass(label2, true, target);
                var cachedObj = crystal.cachedObjects[label];
                if (cachedObj) {
                    target.set(cachedObj.path, cachedObj.val);
                }
            };
            XtalLabel = __decorate([
                component(crystal.labelTagName, 'script'), 
                __metadata('design:paramtypes', [])
            ], XtalLabel);
            return XtalLabel;
        })(polymer.Base);
        XtalLabel.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-label.js.map