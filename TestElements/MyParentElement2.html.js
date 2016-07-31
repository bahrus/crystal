/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../crystal.ts"/>
/// <reference path="EmployeeInfo.ts"/>
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
    var myParentElementTemplate = function (model) { return ("\n    <div style=\"background-color:#cceeee\">\n        <div>[[" + model.message + "]]</div>\n        <div>myProp: [[" + model.myProp + "]]</div>\n        <div on-click=\"" + model.incrementMyProp + "\">Increment myProp</div>\n        <div>Employee name: [[" + model.myEmployee_Name + "]]</div>\n        <div on-click=\"" + model.changeEmployeeName + "\">Change Employee Name</div>\n        <content></content>\n        <my-child-element></my-child-element>\n    </div>\n"); };
    //<script>
    var MyParentElement2 = (function (_super) {
        __extends(MyParentElement2, _super);
        function MyParentElement2() {
            _super.apply(this, arguments);
        }
        MyParentElement2.prototype.incrementMyProp = function () {
            this.myProp++;
        };
        MyParentElement2.prototype.changeEmployeeName = function (e) {
            if (this['set']) {
            }
            else {
                this.myEmployee.Name = 'Austin';
            }
        };
        //@observe(c.myEmployee + '.*')
        MyParentElement2.prototype.onMyEmployeeChange = function (newVal, oldVal) {
        };
        __decorate([
            property({})
        ], MyParentElement2.prototype, "myProp", void 0);
        __decorate([
            property()
        ], MyParentElement2.prototype, "myEmployee", void 0);
        __decorate([
            crystal.methodCallAction({
                do: function (pc) {
                    console.log(pc);
                },
                before: true
            })
        ], MyParentElement2.prototype, "onMyEmployeeChange", null);
        return MyParentElement2;
    }(polymer.Base));
})(TestElements || (TestElements = {}));
//# sourceMappingURL=MyParentElement2.html.js.map