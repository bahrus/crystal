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
            XtalSink.prototype.attached = function () {
                var _this = this;
                var targetTemplate = crystal.nextNonScriptSibling(this);
                this.async(function () {
                    var targets;
                    if (_this.regionSelector) {
                        targets = document.querySelectorAll(_this.regionSelector);
                    }
                    else {
                        targets = [crystal.nextNonScriptSibling(_this)];
                    }
                    var _loop_1 = function(i, ii) {
                        var target = targets[i];
                        var _loop_2 = function(j, jj) {
                            var eventType = _this.eventTypes[j];
                            var attribKey = "when-" + eventType + "-copy";
                            var copies = target.querySelectorAll("[" + attribKey + "]");
                            var _loop_3 = function(k, kk) {
                                var copy = copies[k];
                                copy.addEventListener(eventType, function (ev) {
                                    var copyInfo = copy.getAttribute(attribKey);
                                    //TODO:  traverse up parent tofind attribute
                                    var tokens = copyInfo.split('-');
                                    var valToSet;
                                    switch (tokens[0]) {
                                        case 'text':
                                            valToSet = target.textContent;
                                            break;
                                    }
                                    var path = tokens[2];
                                    targetTemplate.set(path, valToSet);
                                });
                            };
                            for (var k = 0, kk = copies.length; k < kk; k++) {
                                _loop_3(k, kk);
                            }
                        };
                        for (var j = 0, jj = _this.eventTypes.length; j < jj; j++) {
                            _loop_2(j, jj);
                        }
                    };
                    for (var i = 0, ii = targets.length; i < ii; i++) {
                        _loop_1(i, ii);
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
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-sink.js.map