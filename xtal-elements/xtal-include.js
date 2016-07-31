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
        //Add client side include element #3 https://github.com/bahrus/crystal/issues/3
        //region abbreviations
        //#region abbreviations
        function rn(getter) {
            return crystal.getName(getter);
        }
        const c = {
            'href': rn(o => o.href),
            'onHrefChange': rn(o => o.onHrefChange),
        };
        //#endregion
        //endregion
        let XtalInclude = class XtalInclude extends polymer.Base {
            processTransformerTag(el, importHTML, link) {
                if (!el)
                    return importHTML;
                if (el.tagName === 'SCRIPT' && el.hasAttribute('xtal-include-transformer')) {
                    const transformerFn = eval(el.innerHTML);
                    return transformerFn(importHTML, link, this);
                }
                return importHTML;
            }
            onHrefChange(newVal, oldVal) {
                const link = this.importHref(this.href, () => {
                    this.async(() => {
                        this.style.display = 'inline-block';
                        while (this.childElementCount > 0) {
                            Polymer.dom(this).removeChild(this.firstChild);
                        }
                        const children = [];
                        if (this.showUrl) {
                            const directURL = document.createElement("a");
                            directURL.setAttribute("href", this.href);
                            directURL.innerText = this.href;
                            children.push(directURL);
                        }
                        let importHTML = link.import.body.innerHTML;
                        const firstHeadElement = link.import.head.firstElementChild;
                        importHTML = this.processTransformerTag(firstHeadElement, importHTML, link);
                        if (this.transformer) {
                            const transformerFn = eval(this.transformer); //TODO: safety check
                            importHTML = transformerFn(importHTML, link, this);
                        }
                        //const lastBodyElement = link.import.body.lastElementChild;
                        Polymer.dom(this).innerHTML = importHTML;
                    }, 1);
                }, () => {
                    console.log("error loading " + this.href);
                }, this.asyncOpt);
            }
        };
        __decorate([
            property({
                observer: c.onHrefChange
            }), 
            __metadata('design:type', String)
        ], XtalInclude.prototype, "href", void 0);
        __decorate([
            property({
                type: Boolean
            }), 
            __metadata('design:type', Boolean)
        ], XtalInclude.prototype, "showUrl", void 0);
        __decorate([
            property({
                type: Boolean
            }), 
            __metadata('design:type', Boolean)
        ], XtalInclude.prototype, "asyncOpt", void 0);
        __decorate([
            property({
                type: String
            }), 
            __metadata('design:type', String)
        ], XtalInclude.prototype, "transformer", void 0);
        XtalInclude = __decorate([
            component('xtal-include', 'link'), 
            __metadata('design:paramtypes', [])
        ], XtalInclude);
        XtalInclude.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-include.js.map