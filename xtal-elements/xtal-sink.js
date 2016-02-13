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
                this.async(function () {
                    var targets;
                    if (_this.regionSelector) {
                        targets = document.querySelectorAll(_this.regionSelector);
                    }
                    else {
                        targets = [crystal.nextNonScriptSibling(_this)];
                    }
                    debugger;
                    for (var i = 0, ii = targets.length; i < ii; i++) {
                        var target = targets[i];
                        for (var j = 0, jj = _this.eventTypes.length; j < jj; j++) {
                            var eventType = _this.eventTypes[j];
                            target.addEventListener(eventType, function () {
                                debugger;
                            });
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
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-sink.js.map