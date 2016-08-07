///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        Polymer({
            is: 'x-slick-grid',
            data: null,
            //columns: null,
            get columns() {
                return this.grid.getColumns();
            },
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
                fillContainer: {
                    type: Boolean,
                    value: false
                },
                renderCount: {
                    type: Number,
                    value: 0,
                    notify: true,
                    reflectToAttribute: true,
                },
                clickedCellIndex: {
                    type: Number,
                    notify: true,
                    reflectToAttribute: true
                },
                clickedRowIndex: {
                    type: Number,
                    notify: true,
                    reflectToAttribute: true
                },
                numberOfWidthDeltas: {
                    type: Number,
                    notify: true,
                    reflectToAttribute: true
                },
                numberOfOrderChanges: {
                    type: Number,
                    notify: true,
                    reflectToAttribute: true
                }
            },
            ready: function () {
                var _this = this;
                var thisGrid = this.$$('#grid');
                var $thisGrid = $(thisGrid);
                $thisGrid
                    .css('height', this.height)
                    .css('width', this.width);
                this.gridDiv = $thisGrid;
                console.log(this.fillContainer);
                if (this.fillContainer) {
                    console.log('add listener');
                    window.addEventListener('resize', function (e) {
                        _this.debounce('fillContainer', function () {
                            console.log('in resize');
                            var offsetTop = _this.offsetTop;
                            var containerHeight = _this.parentElement.clientHeight;
                            var thisHeight = containerHeight - offsetTop;
                            if (thisHeight > 0) {
                                $thisGrid.css('height', thisHeight);
                                _this.grid.resizeCanvas();
                            }
                        }, 500);
                    });
                }
            },
            setInitialData: function (data, columns, gridOptions, wcOptions) {
                var _this = this;
                this.data = data;
                this.columns = columns;
                this.gridOptions = gridOptions;
                this.grid = new Slick.Grid(this.gridDiv, data, columns, gridOptions);
                var grid = this.grid;
                if (wcOptions) {
                    if (wcOptions.trackCurrentRow) {
                        this.clickedCellIndex = -1;
                        this.clickedRowIndex = -1;
                        grid.onClick.subscribe(function (e) {
                            var cell = grid.getCellFromEvent(e);
                            _this.clickedCellIndex = cell.cell;
                            _this.clickedRowIndex = cell.row;
                        });
                    }
                    if (wcOptions.trackColumnChanges) {
                        this.numberOfWidthDeltas = 0;
                        this.numberOfOrderChanges = 0;
                        grid.onColumnsResized.subscribe(function (e) {
                            _this.numberOfWidthDeltas++;
                        });
                        grid.onColumnsReordered.subscribe(function (e) {
                            _this.numberOfOrderChanges++;
                        });
                    }
                }
                this.renderCount++;
                return grid;
            },
            getSelectedRow: function () {
                if (this.clickedRowIndex === -1)
                    return null;
                return this.data[this.clickedRowIndex];
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
//# sourceMappingURL=x-slick-grid.js.map