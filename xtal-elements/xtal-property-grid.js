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
            //selectedObjectIsPrimitive: boolean;
            //selectedObjectIsObject: boolean;
            //selectedObjectType: string;
            //subProperties: IProperty[];
            XtalPropertyGrid.prototype.onSelectedObjectChange = function () {
                var typeOfObj = typeof this.selectedObject;
                var selectedObjectInfo = {};
                switch (typeOfObj) {
                    case 'string':
                        selectedObjectInfo.isPrimitive = true;
                        selectedObjectInfo.val = this.selectedObject;
                        break;
                    case 'object':
                        selectedObjectInfo.isObject = true;
                        selectedObjectInfo.subProperties = [];
                        for (var key in this.selectedObject) {
                            var val = this.selectedObject[key];
                            var prop = {
                                type: typeof val,
                                name: key,
                                val: val,
                            };
                            selectedObjectInfo.subProperties.push(prop);
                        }
                }
                selectedObjectInfo.type = typeOfObj;
                this.set('selectedObjectInfo', selectedObjectInfo);
                //console.log(this);
            };
            __decorate([
                property({
                    observer: 'onSelectedObjectChange',
                    reflectToAttribute: true,
                    type: Object,
                })
            ], XtalPropertyGrid.prototype, "selectedObject", void 0);
            XtalPropertyGrid = __decorate([
                component('xtal-property-grid'),
                template("<div>\n            <template is=\"dom-if\" if=\"{{selectedObjectInfo.isPrimitive}}\">\n                [[selectedObjectInfo.val]]\n            </template>\n            <template is=\"dom-if\" if=\"{{selectedObjectInfo.isObject}}\">\n                i am here\n                <table>\n                    <template is=\"dom-repeat\" items=\"{{selectedObjectInfo.subProperties}}\">\n                    <tr>\n                        <td>{{item.name}}</td>\n\n                    </tr>\n                    </template>\n                </table>\n            </template>\n         </div>")
            ], XtalPropertyGrid);
            return XtalPropertyGrid;
        })(polymer.Base);
        XtalPropertyGrid.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-property-grid.js.map