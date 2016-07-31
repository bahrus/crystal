var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        const height = 'height';
        const maxElementSize = 'max-element-size'; //dashes means attribute!
        const maxValue = 'max-value';
        const innerDivHeight = 'innerDivHeight';
        const value = 'value';
        class XtalVScroll extends HTMLElement {
            constructor() {
                super();
                this._val = 0;
            }
            get [height]() {
                if (!this.hasAttribute(height)) {
                    return 200;
                }
                return parseFloat(this.getAttribute(height));
            }
            get [maxElementSize]() {
                if (!this.hasAttribute(maxElementSize)) {
                    return 12;
                }
                return parseFloat(this.getAttribute(maxElementSize));
            }
            get [innerDivHeight]() {
                return this[maxElementSize] * this[height];
            }
            get [maxValue]() {
                if (!this.hasAttribute(maxValue)) {
                    return 100;
                }
                return parseInt(this.getAttribute(maxValue));
            }
            set [value](val) {
                this._val = val;
                this.setAttribute(value, val.toString());
            }
            connectedCallback() {
                this.style.width = '28px';
                const shadowRoot = this['attachShadow']({ mode: 'open' });
                shadowRoot.innerHTML = `
                <div style="height:${this[height]}px;width:28px;overflow:auto">
                    <div style="height:${this[innerDivHeight]}px">&nbsp;</div>
                </div>
            `;
                const outerDiv = shadowRoot.querySelector('div');
                outerDiv.addEventListener('scroll', ev => {
                    const val = outerDiv.scrollTop / this[maxElementSize];
                    this[value] = val;
                });
                //console.log(outerDiv);
            }
        }
        customElements.define('xtal-vscroll', XtalVScroll);
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-vscroll.js.map