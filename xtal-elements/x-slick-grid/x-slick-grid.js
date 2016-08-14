///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
///<reference path='x-slick-grid.mouseOverRow.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        function importHrefs(importStep, polymerElement, callBack) {
            if (importStep.length === 0) {
                if (callBack)
                    callBack();
                return;
            }
            var nextStep = importStep.shift();
            if (!nextStep) {
                importHrefs(importStep, polymerElement, callBack);
                return;
            }
            var resolvedURL = polymerElement.resolveUrl(nextStep.importURL);
            if (nextStep.conditonForImport) {
                if (nextStep.conditonForImport(polymerElement)) {
                    polymerElement.importHref(resolvedURL, function () {
                        importHrefs(importStep, polymerElement, callBack);
                    });
                }
            }
            else {
                polymerElement.importHref(resolvedURL, function () {
                    importHrefs(importStep, polymerElement, callBack);
                });
            }
        }
        Polymer({
            is: 'x-slick-grid',
            //columns: null,
            get columns() {
                return this.grid.getColumns();
            },
            get data() {
                return this.grid.getData();
            },
            get selectedRow() {
                if (this.clickedRowIndex === -1)
                    return null;
                return this.data[this.clickedRowIndex];
            },
            get options() {
                return this.grid.getOptions();
            },
            //gridOptions: null,
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
                importSlickGridEditors: {
                    type: Boolean,
                    value: false
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
                },
                selectionModel: {
                    type: String,
                },
                useDataViewDataProvider: {
                    type: Boolean,
                }
            },
            readyFnInitialized: false,
            ready: function () {
                var _this = this;
                var slickDependencies = [
                    {
                        importURL: 'JQuery.html',
                        conditonForImport: function () { return typeof ($) === 'undefined'; }
                    },
                    {
                        importURL: 'JQueryUI.html',
                        conditonForImport: function () { return !($ && $['ui']); }
                    },
                    {
                        importURL: 'Jquery.Event.DragDrop.html',
                        conditonForImport: function () { return !($ && $.fn.drag); }
                    },
                    { importURL: 'SlickCore.html' },
                    { importURL: 'SlickGrid.html' },
                    this.importSlickGridEditors ? { importURL: 'SlickEditors.html' } : null,
                    this.selectionModel === 'Cell' ? { importURL: 'Slick.CellRangeSelector.html' } : null,
                    this.selectionModel === 'Cell' ? { importURL: 'Slick.CellSelectionModel.html' } : null,
                    this.selectionModel === 'Cell' ? { importURL: 'Slick.CellRangeDecorator.html' } : null,
                    this.useDataViewDataProvider ? { importURL: 'Slick.DataView.html' } : null,
                ];
                importHrefs(slickDependencies, this, function () {
                    var thisGrid = _this.$$('#grid');
                    var $thisGrid = $(thisGrid);
                    $thisGrid
                        .css('height', _this.height)
                        .css('width', _this.width);
                    _this.gridDiv = $thisGrid;
                    if (_this.fillContainerWidth || _this.fillContainerHeight) {
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
                    _this.readyFnInitialized = true;
                });
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
                    if (resize && this.grid) {
                        this.grid.resizeCanvas();
                    }
                }
            },
            setEditor: function (columns) {
                for (var i = 0, ii = columns.length; i < ii; i++) {
                    var col = columns[i];
                    if (col.editorFn) {
                        col.editor = col.editorFn();
                    }
                    var childColumns = col.columns;
                    if (childColumns)
                        this.setEditor(childColumns);
                }
            },
            setInitialData: function (data, columns, gridOptions, wcOptions) {
                var _this = this;
                //this.data = data;
                //this.columns = columns;
                if (!this.readyFnInitialized) {
                    setTimeout(function () {
                        _this.setInitialData(data, columns, gridOptions, wcOptions);
                    }, 10);
                    return;
                }
                this.setEditor(columns);
                //this.gridOptions = gridOptions;
                if (wcOptions && wcOptions.dataProvider) {
                    var dataProvider = wcOptions.dataProvider(data);
                    this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                }
                else {
                    this.grid = new Slick.Grid(this.gridDiv, data, columns, gridOptions);
                }
                var grid = this.grid;
                this.wcOptions = wcOptions;
                if (wcOptions.trackRowHover) {
                    this.importHref(this.resolveUrl('x-slick-grid.mouseOverRow.html'), function () {
                        elements.enableMouseOverSlickGrid(_this);
                    }, null, true);
                }
                // grid.onMouseEnter.subscribe((e, d) =>{
                //     //console.log([e, d]);
                // })
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
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=x-slick-grid.js.map