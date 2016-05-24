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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        // Allow a DOM element inside light dom to set value in custom element #8 https://github.com/bahrus/crystal/issues/8
        var XtalSet = (function (_super) {
            __extends(XtalSet, _super);
            function XtalSet() {
                _super.apply(this, arguments);
            }
            XtalSet.prototype.attached = function () {
                var _this = this;
                var actions = crystal.evalInner(this);
                this.async(function () {
                    var target = crystal.nextNonScriptSibling(_this);
                    if (_this.innerTarget) {
                        target = target.querySelector(_this.innerTarget);
                    }
                    performLightDOMActions(actions, target);
                }, 1);
            };
            __decorate([
                property(), 
                __metadata('design:type', String)
            ], XtalSet.prototype, "innerTarget", void 0);
            XtalSet = __decorate([
                component('js-xtal-set'), 
                __metadata('design:paramtypes', [])
            ], XtalSet);
            return XtalSet;
        }(polymer.Base));
        XtalSet.register();
        function performLightDOMActions(actions, target) {
            var domActionContext;
            for (var i = 0, ii = actions.length; i < ii; i++) {
                var action = actions[i];
                if (Array.isArray(action)) {
                    performLightDOMActions(action, target);
                    continue;
                }
                var doFn = action.do;
                if (doFn && typeof (doFn === 'function')) {
                    var domElementAction = action;
                    if (!domActionContext) {
                        domActionContext = {
                            element: target,
                        };
                    }
                    domActionContext.action = action;
                    doFn(domActionContext);
                    continue;
                }
                //#region add attributes / event handlers to dom element
                for (var key in action) {
                    //if (key.indexOf('on') === 0) {
                    //
                    //} else {
                    Polymer.dom(target).setAttribute(key, action[key]);
                }
            }
        }
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=js-xtal-set.js.map