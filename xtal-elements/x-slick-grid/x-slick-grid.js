///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
///<reference path='js/treeGridHelper.ts'/>
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
            polymerElement.importHref(resolvedURL, function () {
                importHrefs(importStep, polymerElement, callBack);
            });
        }
        function attachEventHandlers(grid, handlers) {
            if (!handlers)
                return;
            for (var key in handlers) {
                var handler = handlers[key];
                grid[key].subscribe(handler);
            }
        }
        Polymer({
            is: 'x-slick-grid',
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
            get dataProvider() {
                //const grid = this.grid as Slick.Grid<any>;
                return this._dataProvider;
            },
            wcOptions: null,
            _data: null,
            grid: null,
            gridDiv: null,
            _dataProvider: null,
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
                },
                selectionModel: {
                    type: String,
                },
                useDataViewDataProvider: {
                    type: Boolean,
                },
                useSlickPaging: {
                    type: Boolean,
                },
                useSlickColumnPicker: {
                    type: Boolean
                },
                useSlickFormatters: {
                    type: Boolean
                },
                useSlickEditors: {
                    type: Boolean,
                    value: false
                },
                useTreeGridHelper: {
                    type: Boolean,
                }
            },
            readyFnInitialized: false,
            ready: function () {
                var _this = this;
                var $IsDefined = (typeof ($) !== 'undefined');
                var slickDependencies = [
                    !$IsDefined ? { importURL: 'JQuery.html' } : null,
                    !$IsDefined || !$['ui'] ? { importURL: 'JQueryUI.html' } : null,
                    !$IsDefined || !$.fn.drag ? { importURL: 'Jquery.Event.DragDrop.html' } : null,
                    { importURL: 'SlickCore.html' },
                    { importURL: 'SlickGrid.html' },
                    this.useSlickEditors ? { importURL: 'SlickEditors.html' } : null,
                    this.selectionModel === 'Cell' ? { importURL: 'Slick.CellRangeSelector.html' } : null,
                    this.selectionModel === 'Cell' ? { importURL: 'Slick.CellSelectionModel.html' } : null,
                    this.selectionModel === 'Cell' ? { importURL: 'Slick.CellRangeDecorator.html' } : null,
                    this.selectionModel === 'Row' ? { importURL: 'Slick.RowSelectionModel.html' } : null,
                    this.useDataViewDataProvider ? { importURL: 'Slick.DataView.html' } : null,
                    this.useSlickPaging ? { importURL: 'controls/SlickPager.html' } : null,
                    this.useSlickColumnPicker ? { importURL: 'controls/SlickColumnPicker.html' } : null,
                    this.useSlickFormatters ? { importURL: 'SlickFormatters.html' } : null,
                    this.useTreeGridHelper ? { importURL: 'TreeGridHelper.html' } : null
                ];
                importHrefs(slickDependencies, this, function () {
                    var thisGrid = _this.$$('[role]');
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
                var thisGrid = this.$$('[role="grid"]');
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
            setEditorAndFormatter: function (columns) {
                for (var i = 0, ii = columns.length; i < ii; i++) {
                    var col = columns[i];
                    if (col.editorFn) {
                        col.editor = col.editorFn(col);
                    }
                    if (col.formatterFn) {
                        col.formatter = col.formatterFn(col);
                    }
                    var childColumns = col.columns;
                    if (childColumns)
                        this.setEditorAndFormatter(childColumns);
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
                this.setEditorAndFormatter(columns);
                //this.gridOptions = gridOptions;
                if (!gridOptions)
                    gridOptions = {};
                gridOptions['_container'] = this;
                if (data['addItem']) {
                    var dataProvider = data;
                    dataProvider['container'] = this;
                    this._dataProvider = dataProvider;
                    this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                }
                else {
                    if (this.useTreeGridHelper) {
                        this._data = data;
                    }
                    if (wcOptions && wcOptions.dataProvider) {
                        var dataProvider = wcOptions.dataProvider(data);
                        dataProvider['container'] = this;
                        this._dataProvider = dataProvider;
                        this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                    }
                    else if (this.useDataViewDataProvider) {
                        var dataProvider = new Slick.Data.DataView({ inlineFilters: true });
                        dataProvider['container'] = this;
                        this._dataProvider = dataProvider;
                        this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                    }
                    else {
                        this.grid = new Slick.Grid(this.gridDiv, data, columns, gridOptions);
                    }
                }
                if (this.useTreeGridHelper) {
                    elements.attachToggleClickEvent(this);
                    this.collapseAll = elements.collapseAll;
                    this.expandAll = elements.expandAll;
                }
                var grid = this.grid;
                switch (this.selectionModel) {
                    case 'Cell':
                        grid.setSelectionModel((new Slick.CellSelectionModel()));
                        break;
                    case 'Row':
                        grid.setSelectionModel(new Slick.RowSelectionModel());
                        break;
                }
                this.wcOptions = wcOptions;
                if (wcOptions) {
                    attachEventHandlers(grid, wcOptions.eventHandlers);
                    // if(wcOptions.trackRowHover){
                    //     this.importHref(this.resolveUrl('x-slick-grid.mouseOverRow.html'), () =>{
                    //         enableMouseOverSlickGrid(this);
                    //     }, null, true);
                    // }
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
                    if (wcOptions.enableAddRowOptions && wcOptions.enableAddRowOptions.autoCommit) {
                        grid.onAddNewRow.subscribe(function (e, args) {
                            var data = grid.getData();
                            var item = args.item;
                            grid.invalidateRow(data.length);
                            data.push(item);
                            grid.updateRowCount();
                            grid.render();
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