///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
///<reference path='x-slick-grid.mouseOverRow.ts'/>

module crystal.elements {
    type SelectionModel = 'Cell' | 'Row';

    export interface IXSlickGridEnableAddRowOptions{
        autoCommit?: boolean;
    }
    export interface IXSlickGridOptions<T>{
        trackCurrentRow?:boolean;
        trackColumnChanges?: boolean;
        trackContextMenu?:boolean;
        trackRowHover?: boolean;

        //selectionModel?: SelectionModel;
        //dataViewOptions?: Slick.Data.DataViewOptions<T>;
        dataProvider?: (data: T[]) => Slick.DataProvider<T>;
        enableAddRowOptions?: IXSlickGridEnableAddRowOptions;
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
    export interface IXSlickGridElement<T> extends polymer.Base{
        grid: Slick.Grid<T>;
        options: ISlickGridOptions<T>;
    }
    function importHrefs(importStep: IDynamicImportStep[], polymerElement: polymer.Base, callBack?: () => void){
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
        wcOptions: null,
        grid: null,
        gridDiv: null,
        properties:{
            height:{
                type: String,
                value: '500px',
            },
            width:{
                type: String,
                value: '600px'
            },
            useSlickEditors:{
                type: Boolean,
                value: false
            },
            fillContainerHeight:{
                type: Boolean,
                value: false
            },
            fillContainerWidth:{
                type: Boolean,
                value: false
            },
            renderCount:{
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true,
            },
            clickedCellIndex:{
                type: Number,
                notify: true,
                reflectToAttribute: true
            },
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
            selectionModel:{
                type: String,
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
            }
        },
        readyFnInitialized: false,
        ready: function() {
            const $IsDefined = (typeof($) !== 'undefined');
            const slickDependencies : IDynamicImportStep[] = [
                !$IsDefined ? {importURL: 'JQuery.html'} : null,
                !$IsDefined || !$['ui'] ? {importURL: 'JQueryUI.html'} : null,
                !$IsDefined || !$.fn.drag ? {importURL: 'Jquery.Event.DragDrop.html'} : null,
                {importURL: 'SlickCore.html'},
                {importURL: 'SlickGrid.html'},
                this.useSlickEditors        ? {importURL: 'SlickEditors.html'}               : null,
                this.selectionModel === 'Cell'  ? {importURL: 'Slick.CellRangeSelector.html'}    : null,
                this.selectionModel === 'Cell'  ? {importURL: 'Slick.CellSelectionModel.html'}   : null,
                this.selectionModel === 'Cell'  ? {importURL: 'Slick.CellRangeDecorator.html'}   : null,
                this.selectionModel === 'Row'   ? {importURL: 'Click.RowSelectionModel.html'}    : null,
                this.useDataViewDataProvider    ? {importURL: 'Slick.DataView.html'}             : null,
                this.useSlickPaging             ? {importURL: 'controls/SlickPager.html'}        : null,
                this.useSlickColumnPicker       ? {importURL: 'controls/SlickColumnPicker.html'} : null,
                this.useSlickFormatters         ? {importURL: 'SlickFormatters.html'}            : null
            ];
            importHrefs(slickDependencies, this, () =>{
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
        setEditorAndFormatter(columns: IXSlickGridColumn<any>[]){
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
        setInitialData<T>(data: T[], columns: IXSlickGridColumn<any>[], gridOptions?: Slick.GridOptions<any>,  wcOptions?: IXSlickGridOptions<T>){
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
            if(data['addItem']){
                this.grid =  new Slick.Grid(this.gridDiv, data, columns, gridOptions);
            }else{
                if(wcOptions && wcOptions.dataProvider){
                    const dataProvider = wcOptions.dataProvider(data);
                    this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                }else if(this.useDataViewDataProvider){
                    const dataProvider = new Slick.Data.DataView({ inlineFilters: true });
                    this.grid = new Slick.Grid(this.gridDiv, dataProvider, columns, gridOptions);
                }
                else{
                    this.grid =  new Slick.Grid(this.gridDiv, data, columns, gridOptions);
                }
            }


            const grid = this.grid;
            this.wcOptions = wcOptions;

            if(wcOptions){
                if(wcOptions.trackRowHover){
                    this.importHref(this.resolveUrl('x-slick-grid.mouseOverRow.html'), () =>{
                        enableMouseOverSlickGrid(this);
                    }, null, true);
                }
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


}
