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
        //Add client side include element #3 https://github.com/bahrus/crystal/issues/3
        //region abbreviations
        //#region abbreviations
        function rn(getter) {
            return crystal.getName(getter);
        }
        var c = {
            'href': rn(function (o) { return o.href; }),
            'onHrefChange': rn(function (o) { return o.onHrefChange; }),
        };
        //#endregion
        //endregion
        var XtalInclude = (function (_super) {
            __extends(XtalInclude, _super);
            function XtalInclude() {
                _super.apply(this, arguments);
            }
            XtalInclude.prototype.onHrefChange = function (newVal, oldVal) {
                var _this = this;
                var link = this.importHref(this.href, function () {
                    _this.async(function () {
                        _this.style.display = 'inline-block';
                        while (_this.childElementCount > 0) {
                            Polymer.dom(_this).removeChild(_this.firstChild);
                        }
                        var children = [];
                        var child = link.import.body.firstChild;
                        while (child) {
                            children.push(child);
                            //Polymer.dom(this).appendChild(child);
                            child = child.nextElementSibling;
                        }
                        for (var i = 0, n = children.length; i < n; i++) {
                            child = children[i];
                            Polymer.dom(_this).appendChild(child);
                        }
                    }, 1);
                }, function () {
                    console.log("error loading " + _this.href);
                });
            };
            __decorate([
                property({
                    observer: c.onHrefChange
                }), 
                __metadata('design:type', String)
            ], XtalInclude.prototype, "href", void 0);
            XtalInclude = __decorate([
                component('xtal-include', 'link'), 
                __metadata('design:paramtypes', [])
            ], XtalInclude);
            return XtalInclude;
        })(polymer.Base);
        XtalInclude.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-include.js.map