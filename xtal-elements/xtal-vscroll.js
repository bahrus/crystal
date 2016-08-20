var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        var height = 'height';
        var maxElementSize = 'max-element-size'; //dashes means attribute!
        var maxValue = 'max-value';
        var innerDivHeight = 'innerDivHeight';
        var value = 'value';
        var XtalVScroll = (function (_super) {
            __extends(XtalVScroll, _super);
            function XtalVScroll() {
                _super.call(this);
                this._val = 0;
            }
            Object.defineProperty(XtalVScroll.prototype, height, {
                get: function () {
                    if (!this.hasAttribute(height)) {
                        return 200;
                    }
                    return parseFloat(this.getAttribute(height));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(XtalVScroll.prototype, maxElementSize, {
                get: function () {
                    if (!this.hasAttribute(maxElementSize)) {
                        return 12;
                    }
                    return parseFloat(this.getAttribute(maxElementSize));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(XtalVScroll.prototype, innerDivHeight, {
                get: function () {
                    return this[maxElementSize] * this[height];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(XtalVScroll.prototype, maxValue, {
                get: function () {
                    if (!this.hasAttribute(maxValue)) {
                        return 100;
                    }
                    return parseInt(this.getAttribute(maxValue));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(XtalVScroll.prototype, value, {
                set: function (val) {
                    this._val = val;
                    this.setAttribute(value, val.toString());
                },
                enumerable: true,
                configurable: true
            });
            XtalVScroll.prototype.connectedCallback = function () {
                var _this = this;
                this.style.width = '28px';
                var shadowRoot = this['attachShadow']({ mode: 'open' });
                shadowRoot.innerHTML = "\n                <div style=\"height:" + this[height] + "px;width:28px;overflow:auto\">\n                    <div style=\"height:" + this[innerDivHeight] + "px\">&nbsp;</div>\n                </div>\n            ";
                var outerDiv = shadowRoot.querySelector('div');
                outerDiv.addEventListener('scroll', function (ev) {
                    var val = outerDiv.scrollTop / _this[maxElementSize];
                    _this[value] = val;
                });
                //console.log(outerDiv);
            };
            return XtalVScroll;
        }(HTMLElement));
        customElements.define('xtal-vscroll', XtalVScroll);
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-vscroll.js.map