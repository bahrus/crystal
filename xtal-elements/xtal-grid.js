///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>
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
        let XtalGrid = class XtalGrid extends polymer.Base {
        };
        XtalGrid = __decorate([
            template(`
    <iron-list items="[[data]]" as="item" style="overflow:auto; height:200px">
        <template>
            <div>
                <span>{{item.col0}}</span>
                <span>{{item.col1}}</span>
                <span>{{item.col2}}</span>
                <!--<span>{{item.col3}}</span>-->
                <!--<span>{{item.col4}}</span>-->
                <!--<span>{{item.col5}}</span>-->
                <!--<span>{{item.col6}}</span>-->
                <!--<span>{{item.col7}}</span>-->
                <!--<span>{{item.col8}}</span>-->
                <!--<span>{{item.col9}}</span>-->
                <!--<span>{{item.col10}}</span>-->
                <!--<span>{{item.col11}}</span>-->
                <!--<span>{{item.col12}}</span>-->
                <!--<span>{{item.col13}}</span>-->
                <!--<span>{{item.col14}}</span>-->
                <!--<span>{{item.col15}}</span>-->
                <!--<span>{{item.col16}}</span>-->
                <!--<span>{{item.col17}}</span>-->
                <!--<span>{{item.col18}}</span>-->
                <!--<span>{{item.col19}}</span>-->

            </div>
        </template>
     </iron-list>
    `),
            component('xtal-grid')
        ], XtalGrid);
        XtalGrid.register();
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-grid.js.map