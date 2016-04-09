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
        var XtalPropertyGrid = (function (_super) {
            __extends(XtalPropertyGrid, _super);
            function XtalPropertyGrid() {
                _super.apply(this, arguments);
            }
            XtalPropertyGrid.prototype.onSelectedObjectChange = function () {
                debugger;
                var typeOfObj = typeof this.selectedObject;
                switch (typeOfObj) {
                    case 'string':
                        this.selectedObjectIsPrimitive = true;
                        break;
                }
                this.selectedObjectType = typeOfObj;
            };
            __decorate([
                property({
                    observer: 'onSelectedObjectChange'
                })
            ], XtalPropertyGrid.prototype, "selectedObject", void 0);
            XtalPropertyGrid = __decorate([
                component('xtal-property-grid'),
                template("<div>\n            <template is=\"dom-if\" if=\"{{selectedObjectIsPrimitive}}\">\n                I am here [[selectedObject]]\n            </template>\n         </div>")
            ], XtalPropertyGrid);
            return XtalPropertyGrid;
        })(polymer.Base);
        XtalPropertyGrid.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-property-grid.js.map