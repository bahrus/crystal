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
                        if (_this.showUrl) {
                            var directURL = document.createElement("a");
                            directURL.setAttribute("href", _this.href);
                            directURL.innerText = _this.href;
                            children.push(directURL);
                        }
                        var importHTML = link.import.body.innerHTML;
                        if (_this.transformer) {
                            var transformerFn = eval(_this.transformer); //TODO: safety check
                            importHTML = transformerFn(importHTML, _this);
                        }
                        Polymer.dom(_this).innerHTML = importHTML;
                    }, 1);
                }, function () {
                    console.log("error loading " + _this.href);
                }, this.asyncOpt);
            };
            __decorate([
                property({
                    observer: c.onHrefChange
                })
            ], XtalInclude.prototype, "href", void 0);
            __decorate([
                property({
                    type: Boolean
                })
            ], XtalInclude.prototype, "showUrl", void 0);
            __decorate([
                property({
                    type: Boolean
                })
            ], XtalInclude.prototype, "asyncOpt", void 0);
            __decorate([
                property({
                    type: String
                })
            ], XtalInclude.prototype, "transformer", void 0);
            XtalInclude = __decorate([
                component('xtal-include', 'link')
            ], XtalInclude);
            return XtalInclude;
        })(polymer.Base);
        XtalInclude.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-include.js.map