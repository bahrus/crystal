///<reference path='../node_modules/@types/polymer/index.d.ts'/>
///<reference path='crystal.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        Polymer({
            is: 'js-xtal-init',
            properties: {
                innerTarget: {
                    type: String
                },
                allowNativeElementAsTarget: {
                    type: Boolean
                }
            },
            attached: function () {
                var _this = this;
                var actions = elements.evalInner(this);
                var target = elements.nextNonScriptSibling(this);
                if ((target && target['set']) || this.allowNativeElementAsTarget) {
                    this.processTarget(target, actions);
                }
                else {
                    this.async(function () {
                        target = elements.nextDomBindElement(_this);
                        _this.processTarget(target, actions);
                    }, 1);
                }
            },
            processTarget: function (target, actions) {
                if (this.innerTarget) {
                    target = target.querySelector(this.innerTarget);
                }
                elements.performCustElActions(actions, target);
            }
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=js-xtal-init.js.map