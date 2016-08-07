/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../crystal.ts"/>
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
var TestElements;
(function (TestElements) {
    var RonWeasley = (function (_super) {
        __extends(RonWeasley, _super);
        function RonWeasley() {
            _super.apply(this, arguments);
            this.girlfriend = "Lavandar Brown";
        }
        __decorate([
            property({
                notify: true
            })
        ], RonWeasley.prototype, "girlfriend", void 0);
        RonWeasley = __decorate([
            component('ron-weasley'),
            template("\n        <div>Ron is dating {{girlfriend}}</span>\n        <div>Ron knows Ginny is dating {{ginnyBoyfriend}}</div>\n    ")
        ], RonWeasley);
        return RonWeasley;
    }(polymer.Base));
    RonWeasley.register();
    var GinnyWeasley = (function (_super) {
        __extends(GinnyWeasley, _super);
        function GinnyWeasley() {
            _super.apply(this, arguments);
            this.boyfriend = "Dean Thomas";
        }
        __decorate([
            property({
                notify: true
            })
        ], GinnyWeasley.prototype, "boyfriend", void 0);
        GinnyWeasley = __decorate([
            component('ginny-weasley'),
            template("\n        <div>Ginny is dating {{boyfriend}}</div>\n    ")
        ], GinnyWeasley);
        return GinnyWeasley;
    }(polymer.Base));
    GinnyWeasley.register();
    var HarryPotter = (function (_super) {
        __extends(HarryPotter, _super);
        function HarryPotter() {
            _super.apply(this, arguments);
            this.owlMessage = 'Scar is hurting';
            this.flooMessage = 'test';
        }
        HarryPotter.prototype.onNewOwlMessage = function (newVal, oldVal) { };
        __decorate([
            property({
                observer: 'onNewOwlMessage',
                notify: true,
            })
        ], HarryPotter.prototype, "owlMessage", void 0);
        __decorate([
            crystal.metaBind({
                elementSelector: 'siriusMessanger',
                setPath: 'messageFromHarry',
                targetsMayAppearLater: true,
            })
        ], HarryPotter.prototype, "onNewOwlMessage", null);
        __decorate([
            property({
                notify: true,
            })
        ], HarryPotter.prototype, "flooMessage", void 0);
        HarryPotter = __decorate([
            component('harry-potter'),
            template("\n        <table>\n            <tr>\n                <td>Owl Message: </td>\n                <td>\n                    <input type='text' value=\"{{owlMessage::input}}\"/>\n                </td>\n            </tr>\n            <tr>\n                <td>Floo Message: </td>\n                <td><input type='text' value=\"{{flooMessage::input}}\"/></td>\n            </tr>\n        </table>\n    ")
        ], HarryPotter);
        return HarryPotter;
    }(polymer.Base));
    HarryPotter.register();
    var SiriusBlack = (function (_super) {
        __extends(SiriusBlack, _super);
        function SiriusBlack() {
            _super.apply(this, arguments);
        }
        __decorate([
            property()
        ], SiriusBlack.prototype, "messageFromHarry", void 0);
        SiriusBlack = __decorate([
            component('sirius-black'),
            template("\n        <span>Message received from Harry: {{messageFromHarry}}</span>\n    ")
        ], SiriusBlack);
        return SiriusBlack;
    }(polymer.Base));
    SiriusBlack.register();
    TestElements.sendFlooMessage = {
        do: crystal.CoordinateDataBetweenElementsActionImpl,
        watchPath: 'flooMessage',
        transferDataActions: []
    };
})(TestElements || (TestElements = {}));
//# sourceMappingURL=hogwarts-elements.js.map