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
        var XtalSink = (function (_super) {
            __extends(XtalSink, _super);
            function XtalSink() {
                _super.apply(this, arguments);
                this.eventTypes = ['click'];
            }
            XtalSink.prototype.doCopy = function (copy, attribKey, targetTemplate) {
                var copyInfo = copy.getAttribute(attribKey);
                //TODO:  traverse up parent tofind attribute
                var tokens = copyInfo.split('-to-');
                var valToSet;
                switch (tokens[0]) {
                    case 'text':
                        valToSet = copy.textContent;
                        break;
                }
                var path = tokens[1];
                targetTemplate.set(path, valToSet);
            };
            XtalSink.prototype.attached = function () {
                var _this = this;
                this.async(function () {
                    var targetTemplate = crystal.nextNonScriptSibling(_this);
                    var targets;
                    if (_this.regionSelector) {
                        targets = document.querySelectorAll(_this.regionSelector);
                    }
                    else {
                        targets = [crystal.nextNonScriptSibling(_this)];
                    }
                    for (var i = 0, ii = targets.length; i < ii; i++) {
                        var target = targets[i];
                        for (var j = 0, jj = _this.eventTypes.length; j < jj; j++) {
                            var eventType = _this.eventTypes[j];
                            if (eventType === 'init') {
                                var attribKey_1 = 'xtal-copy';
                                var copies = target.querySelectorAll("[" + attribKey_1 + "]");
                                for (var k = 0, kk = copies.length; k < kk; k++) {
                                    var copy_1 = copies[k];
                                    _this.doCopy(copy_1, attribKey_1, targetTemplate);
                                }
                            }
                            else {
                                var attribKey = "when-" + eventType + "-copy";
                                var copies = target.querySelectorAll("[" + attribKey + "]");
                                for (var k = 0, kk = copies.length; k < kk; k++) {
                                    var copy = copies[k];
                                    copy.addEventListener(eventType, function (ev) {
                                        _this.doCopy(copy, attribKey, targetTemplate);
                                    });
                                }
                            }
                        }
                    }
                }, 1);
            };
            __decorate([
                property()
            ], XtalSink.prototype, "regionSelector", void 0);
            __decorate([
                property()
            ], XtalSink.prototype, "eventTypes", void 0);
            XtalSink = __decorate([
                component('xtal-sink')
            ], XtalSink);
            return XtalSink;
        }(polymer.Base));
        XtalSink.register();
        var tes = function (x) { return "\n        <ts-xtal-init>\n    context =>{\n        const props: test.TSInitTest.ITBD = {\n            isNumberOdd: i => i % 2 === 1,\n            numbers: [0, 1, 2, 3],\n            clicked: false,\n            handleClick: function(e: Event){\n                this['lastClicked'] = e.target['number'];\n                this['clicked'] = true;\n            }\n        };\n        return props;\n    }\n</ts-xtal-init>\n\n<template is=\"dom-bind\">\n    <h1>&lt;template is=\"dom-bind\"&gt; Demo</h1>\n    <template is=\"dom-if\" if=\"{{clicked}}\">\n        <p>You last clicked on {{lastClicked}}.</p>\n    </template>\n    <template is=\"dom-repeat\" items=\"{{numbers}}\">\n        <p>\n        <div number=\"[[item]]\" odd=\"[[isNumberOdd(item)]]\" on-click=\"handleClick\">[[item]]</div>\n        <template is=\"dom-if\" if=\"{{isNumberOdd(item)}}\">\n            (By the way, I'm odd.)\n        </template>\n        </p>\n    </template>\n</template>\n        \n    "; };
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-sink.js.map