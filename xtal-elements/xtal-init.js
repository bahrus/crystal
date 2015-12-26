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
        //Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
        var XtalInit = (function (_super) {
            __extends(XtalInit, _super);
            function XtalInit() {
                _super.apply(this, arguments);
            }
            XtalInit.prototype.attached = function () {
                var inner = this.innerText.trim();
                if (!inner['startsWith']('[')) {
                    inner = '[' + inner + ']';
                }
                var actions = eval(inner);
                var target = nextNonScriptSibling(this);
                for (var i = 0, ii = actions.length; i < ii; i++) {
                    var action = actions[i];
                    for (var key in action) {
                        var currVal = target.get(key);
                        var newOrExtendedVal = action[key];
                        if (!currVal) {
                            target.set(key, newOrExtendedVal);
                        }
                        else {
                            //TODO:  untested condition
                            crystal.extend(currVal, newOrExtendedVal, true);
                            target.set(key, currVal);
                        }
                    }
                }
            };
            XtalInit = __decorate([
                component('xtal-init', 'script'), 
                __metadata('design:paramtypes', [])
            ], XtalInit);
            return XtalInit;
        })(polymer.Base);
        XtalInit.register();
        function nextNonScriptSibling(el) {
            var nextElement = el.nextElementSibling;
            while (nextElement && nextElement.tagName === 'SCRIPT') {
                nextElement = nextElement.nextElementSibling;
            }
            return nextElement;
        }
        elements.nextNonScriptSibling = nextNonScriptSibling;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-init.js.map