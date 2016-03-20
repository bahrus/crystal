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
        var XtalGrid = (function (_super) {
            __extends(XtalGrid, _super);
            function XtalGrid() {
                _super.apply(this, arguments);
            }
            XtalGrid = __decorate([
                template("\n    <iron-list items=\"[[data]]\" as=\"item\" style=\"overflow:auto; height:200px\">\n        <template>\n            <div>\n                <span>{{item.col0}}</span>\n                <span>{{item.col1}}</span>\n                <span>{{item.col2}}</span>\n                <!--<span>{{item.col3}}</span>-->\n                <!--<span>{{item.col4}}</span>-->\n                <!--<span>{{item.col5}}</span>-->\n                <!--<span>{{item.col6}}</span>-->\n                <!--<span>{{item.col7}}</span>-->\n                <!--<span>{{item.col8}}</span>-->\n                <!--<span>{{item.col9}}</span>-->\n                <!--<span>{{item.col10}}</span>-->\n                <!--<span>{{item.col11}}</span>-->\n                <!--<span>{{item.col12}}</span>-->\n                <!--<span>{{item.col13}}</span>-->\n                <!--<span>{{item.col14}}</span>-->\n                <!--<span>{{item.col15}}</span>-->\n                <!--<span>{{item.col16}}</span>-->\n                <!--<span>{{item.col17}}</span>-->\n                <!--<span>{{item.col18}}</span>-->\n                <!--<span>{{item.col19}}</span>-->\n\n            </div>\n        </template>\n     </iron-list>\n    "),
                component('xtal-grid')
            ], XtalGrid);
            return XtalGrid;
        })(polymer.Base);
        XtalGrid.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-grid.js.map