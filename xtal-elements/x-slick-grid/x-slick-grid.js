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
                fillContainerHeight: {
                    type: Boolean,
                    value: false
                },
                fillContainerWidth: {
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
                },
                isContextMenuOpen: {
                    type: Boolean,
                    notify: true,
                    reflectToAttribute: true
                },
                lastClickedXValue: {
                    type: Number,
                    notify: true,
                    reflectToAttribute: true
                },
                lastClickedYValue: {
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
                if (this.fillContainerWidth || this.fillContainerHeight) {
                    window.addEventListener('resize', function (e) {
                        if (_this.fillContainerWidth && _this.fillContainerHeight) {
                            _this.debounce('fillContainerBothDim', _this.fillContainerBothDimImpl, 500);
                        }
                        else if (_this.fillContainerHeight) {
                            _this.debounce('fillContainerHeight', _this.fillContainerHeightImpl, 500);
                        }
                        else {
                            _this.debounce('fillContainerWidth', _this.fillContainerWidthImpl, 500);
                        }
                    });
                }
            },
            fillContainerBothDimImpl: function () {
                this.fillContainerXImpl('offsetTop', 'clientHeight', 'height', false);
                this.fillContainerXImpl('offsetLeft', 'clientWidth', 'width', true);
            },
            fillContainerHeightImpl: function () {
                this.fillContainerXImpl('offsetTop', 'clientHeight', 'height', true);
            },
            fillContainerWidthImpl: function () {
                this.fillContainerXImpl('offsetLeft', 'clientWidth', 'width', true);
            },
            fillContainerXImpl: function (offsetDim, clientDim, cssDim, resize) {
                var thisGrid = this.$$('#grid');
                var $thisGrid = $(thisGrid);
                var offset = this[offsetDim];
                var containerLength = this.parentElement[clientDim];
                var thisLength = containerLength - offset;
                if (thisLength > 0) {
                    $thisGrid.css(cssDim, thisLength);
                    if (resize) {
                        this.grid.resizeCanvas();
                    }
                }
            },
            setInitialData: function (data, columns, gridOptions, wcOptions) {
                var _this = this;
                this.data = data;
                this.columns = columns;
                for (var i = 0, ii = columns.length; i < ii; i++) {
                    var col = columns[i];
                    // if(col.editorNSFn && !col.editor){
                    //     let editorFn = window;
                    //     const editorNSFn = col.editorNSFn;
                    //     for(let j = 0, jj = editorNSFn.length; j < jj; j++){
                    //         const token = editorNSFn[j];
                    //         editorFn = editorFn[token];
                    //     }
                    //     col.editor = editorFn;
                    // }
                    if (col.editorFn) {
                        col.editor = col.editorFn();
                    }
                }
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
                    if (wcOptions.trackContextMenu) {
                        this.isContextMenuOpen = false;
                        grid.onContextMenu.subscribe(function (e) {
                            e.preventDefault();
                            _this.isContextMenuOpen = true;
                            _this.lastClickedXValue = e.pageX;
                            _this.lastClickedYValue = e.pageY;
                            var _thisEl = _this;
                            $("body").one("click", function () {
                                _thisEl.isContextMenuOpen = false;
                            });
                        });
                    }
                    if (wcOptions.useCellSelectionModel) {
                        grid.setSelectionModel(new Slick.CellSelectionModel());
                    }
                }
                if (this.fillContainerHeight) {
                    this.fillContainerHeightImpl();
                }
                if (this.fillContainerWidth) {
                    this.fillContainerWidthImpl();
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