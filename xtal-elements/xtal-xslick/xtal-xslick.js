///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        Polymer({
            is: 'xtal-xslick',
            data: null,
            columns: null,
            gridOptions: null,
            wcOptions: null,
            grid: null,
            gridDiv: null,
            properties: {
                height: {
                    type: String,
                    value: '500px',
                },
                width: {
                    type: String,
                    value: '600px'
                },
                renderCount: {
                    type: Number,
                    value: 0,
                    notify: true,
                    reflectToAttribute: true,
                }
            },
            ready: function () {
                var thisGrid = this.$$('#grid');
                var $thisGrid = $(thisGrid);
                $thisGrid
                    .css('height', this.height)
                    .css('width', this.width);
                this.gridDiv = $thisGrid;
            },
            setInitialData: function (data, columns, gridOptions, wcOptions) {
                this.data = data;
                this.columns = columns;
                this.gridOptions = gridOptions;
                this.grid = new Slick.Grid(this.gridDiv, data, columns, gridOptions);
                this.renderCount++;
                return this.grid;
            },
            getGrid: function () {
                return this.grid;
            },
            getGridDiv: function () {
                return this.gridDiv;
            }
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-xslick.js.map