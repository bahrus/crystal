///<reference path='../../node_modules/@types/polymer/index.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
///<reference path='js/treeGridHelper.ts'/>

module crystal.elements {
    type SelectionModel = 'Cell' | 'Row' | 'RowPlus';

    export interface IXSlickGridEnableAddRowOptions{
        autoCommit?: boolean;
    }
    export interface IXSlickGridOptions<T>{
        trackCurrentRow?:boolean;
        trackColumnChanges?: boolean;
        trackContextMenu?:boolean;
        //trackRowHover?: boolean;

        //selectionModel?: SelectionModel;
        //dataViewOptions?: Slick.Data.DataViewOptions<T>;
        dataProvider?: (data: T[]) => Slick.DataProvider<T>;
        enableAddRowOptions?: IXSlickGridEnableAddRowOptions;
        eventHandlers?: ISlickGridEventHandlers<T>;
    }

    export interface IXSlickGridColumn<T> extends Slick.Column<T>{
        //editorNSFn?: string[]
        editorFn?: (col?: IXSlickGridColumn<T>) => any;
        formatterFn?: (col?: IXSlickGridColumn<T>) => any;
        columns?: IXSlickGridColumn<T>[];
    }

    export interface IDynamicImportStep{
        importURL: string;
    }
    export interface ISlickGridOptions<T> extends Slick.GridOptions<T>{
        frozenColumn: number;
    }
    
    export interface ISlickGridEventHandlers<T>{
        onScroll?: (eventData: Slick.OnScrollEventArgs<T>, data?: T) => void;
        onSort?: (eventData: Slick.OnSortEventArgs<T>, data?: T) => void
        onHeaderMouseEnter?: (eventData: Slick.OnHeaderMouseEventArgs<T>, data?: T) => void;
        onHeaderMouseLeave?: (eventData: Slick.OnHeaderMouseEventArgs<T>, data?: T) => void;
        onHeaderContextMenu?: (eventData: Slick.OnHeaderContextMenuEventArgs<T>, data?: T) => void;
        onHeaderClick?: (eventData: Slick.OnHeaderClickEventArgs<T>, data?: T) => void;
        onHeaderCellRendered?: (eventData: Slick.OnHeaderCellRenderedEventArgs<T>, data?: T) => void;
        onBeforeHeaderCellDestroy?: (eventData: Slick.OnBeforeHeaderCellDestroyEventArgs<T>, data?: T) => void;
        onHeaderRowCellRendered?: (eventData: Slick.OnHeaderRowCellRenderedEventArgs<T>, data?: T) => void;
        onBeforeHeaderRowCellDestroy?: (eventData: Slick.OnBeforeHeaderRowCellDestroyEventArgs<T>, data?: T) => void;
        onMouseEnter?: (eventData: Slick.OnMouseEnterEventArgs<T>, data?: T) => void;
        onMouseLeave?: (eventData: Slick.OnMouseLeaveEventArgs<T>, data?: T) => void;
        onClick?: (eventData: Slick.OnClickEventArgs<T>, data?: T) => void;
        onDblClick?: (eventData: Slick.OnDblClickEventArgs<T>, data?: T) => void;
        onContextMenu?: (eventData: Slick.OnContextMenuEventArgs<T>, data?: T) => void;
        onKeyDown?: (eventData: Slick.OnKeyDownEventArgs<T>, data?: T) => void;
        onAddNewRow?: (eventData: Slick.OnAddNewRowEventArgs<T>, data?: T) => void;
        onValidationError?: (eventData: Slick.OnValidationErrorEventArgs<T>, data?: T) => void;
        onColumnsReordered?: (eventData: Slick.OnColumnsReorderedEventArgs<T>, data?: T) => void;
        onColumnsResized?: (eventData: Slick.OnColumnsResizedEventArgs<T>, data?: T) => void;
        onCellChange?: (eventData: Slick.OnCellChangeEventArgs<T>, data?: T) => void;
        onBeforeEditCell?: (eventData: Slick.OnBeforeEditCellEventArgs<T>, data?: T) => void;
        onBeforeCellEditorDestroy?: (eventData: Slick.OnBeforeCellEditorDestroyEventArgs<T>, data?: T) => void;
        onBeforeDestroy?: (eventData: Slick.OnBeforeDestroyEventArgs<T>, data?: T) => void;
        onActiveCellChanged?: (eventData: Slick.OnActiveCellChangedEventArgs<T>, data?: T) => void;
        onActiveCellPositionChanged?: (eventData: Slick.OnActiveCellPositionChangedEventArgs<T>, data?: T) => void;
        onDragInit?: (eventData: Slick.OnDragInitEventArgs<T>, data?: T) => void;
        onDragStart?: (eventData: Slick.OnDragStartEventArgs<T>, data?: T) => void;
        onDrag?: (eventData: Slick.OnDragEventArgs<T>, data?: T) => void;
        onDragEnd?: (eventData: Slick.OnDragEndEventArgs<T>, data?: T) => void;
        onSelectedRowsChanged?: (eventData: Slick.OnSelectedRowsChangedEventArgs<T>, data?: T) => void;
        onCellCssStylesChanged?: (eventData: Slick.OnCellCssStylesChangedEventArgs<T>, data?: T) => void;
        onViewportChanged?: (eventData: Slick.OnViewportChangedEventArgs<T>, data?: T) => void;
        onFooterRowCellRendered?: (eventData: any, data?: any) => void;
    }
    export function importHrefs(importStep: IDynamicImportStep[], polymerElement: polymer.Base, callBack?: () => void){
        if(importStep.length === 0) {
            if(callBack) callBack();
            return;
        }
        const nextStep = importStep.shift();
        if(!nextStep){
            importHrefs(importStep, polymerElement, callBack);
            return;
        }
        const resolvedURL = polymerElement.resolveUrl(nextStep.importURL);
        polymerElement.importHref(resolvedURL, () =>{
            importHrefs(importStep, polymerElement, callBack);
        })
    }
    export function attachEventHandlers<T>(grid: Slick.Grid<T>, handlers: ISlickGridEventHandlers<T>){
        if(!handlers) return;
        for(const key in handlers){
            const handler = handlers[key];
            grid[key].subscribe(handler);
        }

    }
    export interface IXSlickGridElement<T> extends polymer.Base{
        grid: Slick.Grid<T>;
        options: ISlickGridOptions<T>;
        data: T[];
        _data: T[];
        dataProvider: any;
        columns: Slick.Column<T>[];
        selectedRow: T;
    }
    
    export interface IGridRenderParams<T>{
        data: T[]; 
        columns: IXSlickGridColumn<any>[];
        gridOptions?: Slick.GridOptions<any>;  
        wcOptions?: crystal.elements.IXSlickGridOptions<T>;
    }
    export const onNewGridRenderParams = 'onNewGridRenderParams';

}

Polymer({
        is: 'x-slick-grid',
        get columns(){
            return this.grid.getColumns();
        },
        get data(){
            return this.grid.getData();
        },
        get selectedRow(){
            if(this.clickedRowIndex === -1) return null;
            return this.data[this.clickedRowIndex];
        },
        get options(){
            return this.grid.getOptions();
        },
        get dataProvider(){
            //const grid = this.grid as Slick.Grid<any>;
            return this._dataProvider;
        },
        wcOptions: null,
        _data: null,
        grid: null,
        gridDiv: null,
        _dataProvider: null,
        properties:{
            /**
            * The height of the grid.
            */
            height:{
                type: String,
                value: '500px',
            },
            /**
             * The width of the grid
             */
            width:{
                type: String,
                value: '600px'
            },
            /**
             *  If attribute is present, stretch the grid to the bottom edge of the containing element 
            */          
            fillContainerHeight:{
                type: Boolean,
                value: false
            },
            /**
             * If attribute is present, stretch the grid to the right edge of the containing element
             */
            fillContainerWidth:{
                type: Boolean,
                value: false
            },
            /**
             * Count of how many times the grid has been rendered. 
             */
            renderCount:{
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true,
            },
            /**
             * Indicates the last clicked cell index
             */
            clickedCellIndex:{
                type: Number,
                notify: true,
                reflectToAttribute: true,
                readOnly: true,
            },
            /**
             * Indicates the last clicked row index
             */
            clickedRowIndex:{
                type: Number,
                notify: true,
                reflectToAttribute: true
            },
            numberOfWidthDeltas:{
                type: Number,
                notify: true,
                reflectToAttribute: true
            },
            numberOfOrderChanges:{
                type: Number,
                notify: true,
                reflectToAttribute: true
            },
            isContextMenuOpen:{
                type:  Boolean,
                notify: true,
                reflectToAttribute: true
            },
            lastClickedXValue:{
                type: Number,
                notify: true,
                reflectToAttribute: true
            },
            lastClickedYValue:{
                type: Number,
                notify: true,
                reflectToAttribute: true
            },
            /**
             * Possible values are 'Cell', 'Row' 'RowPlus'
             */
            selectionModel:{
                type: String,
            },
            useSlickAutoToolTips:{
                type: Boolean,
            },
            useSlickCellCopyManager:{
                type: Boolean,
            },
            useSlickCheckboxSelectColumn:{
                type: Boolean,
            },
            useDataViewDataProvider:{
                type:  Boolean,
            },
            useSlickPaging:{
                type: Boolean,
            },
            useSlickColumnPicker:{
                type:  Boolean
            },
            useSlickFormatters:{
                type:  Boolean
            },
            useSlickEditors:{
                type: Boolean,
                value: false
            },
            useTreeGridHelper:{
                type:  Boolean,
            },
            gridRenderParams:{
                type: Object,
                observer: crystal.elements.onNewGridRenderParams
            }
        },
        readyFnInitialized: false,
        ready: function() {
            this.innerHTML = `
            <div role="grid"></div>
            `;
            const $IsDefined = (typeof($) !== 'undefined');
            const sm = this.selectionModel;
            const incCell = ((sm === 'Cell') || (sm === 'RowPlus'));
            const incRow = ((sm === 'Row') || (sm === 'RowPlus'));
            const slickDependencies : crystal.elements.IDynamicImportStep[] = [
                !$IsDefined ? {importURL: 'JQuery.html'} : null,
                !$IsDefined || !$['ui'] ? {importURL: 'JQueryUI.html'} : null,
                !$IsDefined || !$.fn.drag ? {importURL: 'Jquery.Event.DragDrop.html'} : null,
                {importURL: 'SlickCore.html'},
                {importURL: 'SlickGrid.html'},
                this.useSlickEditors ? {importURL: 'SlickEditors.html'}               : null,
                incCell ? {importURL: 'Slick.CellRangeSelector.html'}    : null,
                incCell ? {importURL: 'Slick.CellSelectionModel.html'}   : null,
                incCell ? {importURL: 'Slick.CellRangeDecorator.html'}   : null,
                this.useSlickCellCopyManager ? {importURL: 'Slick.CellSelectionModel.html'} : null,
                this.useSlickAutoToolTips ? {importURL: 'Slick.AutoToolTips.html'} : null,
                this.useSlickCheckboxSelectColumn ? {importURL: 'Slick.CheckboxSelectColumn.html'} : null,
                incCell  ? {importURL: 'Slick.RowSelectionModel.html'}    : null,
                this.useDataViewDataProvider ? {importURL: 'Slick.DataView.html'}             : null,
                this.useSlickPaging ? {importURL: 'controls/SlickPager.html'}        : null,
                this.useSlickColumnPicker  ? {importURL: 'controls/SlickColumnPicker.html'} : null,
                this.useSlickFormatters ? {importURL: 'SlickFormatters.html'}            : null,
                this.useTreeGridHelper ? {importURL: 'TreeGridHelper.html'}             : null
            ];
            crystal.elements.importHrefs(slickDependencies, this, () =>{
                const thisGrid = this.$$('[role]');
                const $thisGrid = $(thisGrid);
                $thisGrid
                    .css('height', this.height)
                    .css('width', this.width);
                this.gridDiv = $thisGrid;
                if(this.fillContainerWidth || this.fillContainerHeight){
                    window.addEventListener('resize', e => {
                        if(this.fillContainerWidth && this.fillContainerHeight) {
                            this.debounce('fillContainerBothDim', this.fillContainerBothDimImpl, 500);
                        }else if(this.fillContainerHeight){
                            this.debounce('fillContainerHeight', this.fillContainerHeightImpl, 500);
                        }else{ //width only
                            this.debounce('fillContainerWidth', this.fillContainerWidthImpl, 500);
                        }
                    });

                }
                if(this.useTreeGridHelper){
                    this.analyzeTreeNodes = crystal.elements.xslickgrid.analyzeTreeNodes;
                    this.sortColumn = crystal.elements.xslickgrid.sortColumn;
                }
                this.readyFnInitialized = true;
            });

        },
        fillContainerBothDimImpl: function(){
            this.fillContainerXImpl('offsetTop', 'clientHeight', 'height', false);
            this.fillContainerXImpl('offsetLeft', 'clientWidth', 'width', true);
        },
        fillContainerHeightImpl: function(){
            this.fillContainerXImpl('offsetTop', 'clientHeight', 'height', true);
        },
        fillContainerWidthImpl: function(){
            this.fillContainerXImpl('offsetLeft', 'clientWidth', 'width', true);
        },
        fillContainerXImpl: function(offsetDim: string, clientDim: string , cssDim: string, resize: boolean){
            const thisGrid = this.$$('[role="grid"]');
            const $thisGrid = $(thisGrid);
            const offset = this[offsetDim];
            const containerLength = this.parentElement[clientDim];
            const thisLength = containerLength - offset;
            if(thisLength > 0){
                $thisGrid.css(cssDim, thisLength);
                if(resize && this.grid){
                    this.grid.resizeCanvas();
                }

            }
        },
        setEditorAndFormatter: function(columns: crystal.elements.IXSlickGridColumn<any>[]){
            for(let i = 0, ii = columns.length; i < ii; i++){
                let col = columns[i];
                if(col.editorFn){
                    col.editor = col.editorFn(col);
                }
                if(col.formatterFn){
                    col.formatter = col.formatterFn(col)
                }
                const childColumns = col.columns;
                if(childColumns) this.setEditorAndFormatter(childColumns);
            }
        },
        [crystal.elements.onNewGridRenderParams]<T>(newVal: crystal.elements.IGridRenderParams<T>){
            this.setInitialData(newVal.data, newVal.columns, newVal.gridOptions, newVal.wcOptions);
        },
        setInitialData<T>(data: T[], columns: crystal.elements.IXSlickGridColumn<any>[], gridOptions?: Slick.GridOptions<any>,  wcOptions?: crystal.elements.IXSlickGridOptions<T>){
            //this.data = data;
            //this.columns = columns;
            if(!this.readyFnInitialized){
                setTimeout(() =>{
                    this.setInitialData(data, columns, gridOptions, wcOptions);

                }, 10);
                return;
            }
            this.setEditorAndFormatter(columns);
            //this.gridOptions = gridOptions;
            if(!gridOptions) gridOptions = {};
            gridOptions['_container'] = this;
            if(data['addItem']){
                const dataProvider = data;
                dataProvider['container'] = this;
                this._dataProvider = dataProvider;
                this.grid =  new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
            }else{
                if(this.useTreeGridHelper){
                    this._data = data;
                }
                if(wcOptions && wcOptions.dataProvider){
                    const dataProvider = wcOptions.dataProvider(data);
                    dataProvider['container'] = this;
                    this._dataProvider = dataProvider;
                    this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                }else if(this.useDataViewDataProvider){
                    const dataProvider = new Slick.Data.DataView({ inlineFilters: true });
                    dataProvider['container'] = this;
                    this._dataProvider = dataProvider;
                    this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                }
                else{
                    this.grid =  new Slick.Grid(this.gridDiv, data, columns, gridOptions);
                }
            }
            if(this.useTreeGridHelper){
                crystal.elements.xslickgrid.attachToggleClickEvent<any>(this as crystal.elements.IXSlickGridElement<any>);
                this.collapseAll = crystal.elements.xslickgrid.collapseAll;
                this.expandAll = crystal.elements.xslickgrid.expandAll;
            }
            const grid = this.grid;
            switch(this.selectionModel){
                case 'Cell':
                    grid.setSelectionModel((new Slick.CellSelectionModel()));
                    break;
                case 'RowPlus':
                case 'Row':
                    grid.setSelectionModel(new Slick.RowSelectionModel());
                    break;
            }
            this.wcOptions = wcOptions;

            if(wcOptions){
                crystal.elements.attachEventHandlers(grid, wcOptions.eventHandlers);
                // if(wcOptions.trackRowHover){
                //     this.importHref(this.resolveUrl('x-slick-grid.mouseOverRow.html'), () =>{
                //         enableMouseOverSlickGrid(this);
                //     }, null, true);
                // }
                if(wcOptions.trackCurrentRow){
                    this.clickedCellIndex = -1;
                    this.clickedRowIndex = -1;
                    grid.onClick.subscribe(e => {
                        var cell = grid.getCellFromEvent(e);
                        this.clickedCellIndex = cell.cell;
                        this.clickedRowIndex = cell.row;
                    });
                }
                if(wcOptions.trackColumnChanges){
                    this.numberOfWidthDeltas = 0;
                    this.numberOfOrderChanges = 0;
                    grid.onColumnsResized.subscribe(e=>{
                        this.numberOfWidthDeltas++;
                    });
                    grid.onColumnsReordered.subscribe(e => {
                        this.numberOfOrderChanges++;
                    });
                }
                if(wcOptions.trackContextMenu){
                    this.isContextMenuOpen = false;
                    grid.onContextMenu.subscribe(e =>{
                        e.preventDefault();
                        this.isContextMenuOpen = true;
                        this.lastClickedXValue = e.pageX;
                        this.lastClickedYValue = e.pageY;
                        const _thisEl = this;
                        $("body").one("click", function () {
                            _thisEl.isContextMenuOpen = false;
                        });
                    });
                }
                if(wcOptions.enableAddRowOptions && wcOptions.enableAddRowOptions.autoCommit){
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
            if(this.fillContainerHeight){
                this.fillContainerHeightImpl();
            }
            if(this.fillContainerWidth){
                this.fillContainerWidthImpl();
            }

            this.renderCount++;
            return grid;
        },


    });
