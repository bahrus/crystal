///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
///<reference path='x-slick-grid.mouseOverRow.ts'/>

module crystal.elements {
    export interface IXSlickGridOptions{
        trackCurrentRow?:boolean;
        trackColumnChanges?: boolean;
        trackContextMenu?:boolean;
        useCellSelectionModel?: boolean;
        trackRowHover?: boolean;
    }

    export interface IXSlickGridColumn<T> extends Slick.Column<T>{
        //editorNSFn?: string[]
        editorFn?: (col?: IXSlickGridColumn<T>) => any;
        columns?: IXSlickGridColumn<T>[];
    }

    export interface IDynamicImportStep{
        conditonForImport?: (polymerElement?: polymer.Base) => boolean;
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
        if(nextStep.conditonForImport){
            if(nextStep.conditonForImport(polymerElement)){
                polymerElement.importHref(resolvedURL, () =>{
                    importHrefs(importStep, polymerElement, callBack);
                })
            }
        }else{
            polymerElement.importHref(resolvedURL, () =>{
                importHrefs(importStep, polymerElement, callBack);
            })
        }
    }


    Polymer({
        is: 'x-slick-grid',
        //columns: null,
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
        //gridOptions: null,
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
            importSlickGridEditors:{
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
            }
        },
        readyFnInitialized: false,
        ready: function() {
            const slickDependencies : IDynamicImportStep[] = [
                {
                    importURL: 'JQuery.html',
                    conditonForImport: () => typeof($) === 'undefined'
                },
                {
                    importURL: 'JQueryUI.html',
                    conditonForImport: () => !($ && $['ui'])
                },
                {
                    importURL: 'Jquery.Event.DragDrop.html',
                    conditonForImport: () => !($ && $.fn.drag)
                },
                {importURL: 'SlickCore.html'},
                {importURL: 'SlickGrid.html'},
                this.importSlickGridEditors ? {importURL: 'SlickEditors.html'} : null
            ];
            importHrefs(slickDependencies, this, () =>{
                const thisGrid = this.$$('#grid');
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
            const thisGrid = this.$$('#grid');
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
        setEditor(columns: IXSlickGridColumn<any>[]){
            for(let i = 0, ii = columns.length; i < ii; i++){
                let col = columns[i];
                if(col.editorFn){
                    col.editor = col.editorFn();
                }
                const childColumns = col.columns;
                if(childColumns) this.setEditor(childColumns);
            }
        },
        setInitialData(data: any[], columns: IXSlickGridColumn<any>[], gridOptions?: Slick.GridOptions<any>,  wcOptions?: IXSlickGridOptions){
            //this.data = data;
            //this.columns = columns;
            if(!this.readyFnInitialized){
                setTimeout(() =>{
                    this.setInitialData(data, columns, gridOptions, wcOptions);

                }, 10);
                return;
            }
            this.setEditor(columns);
            //this.gridOptions = gridOptions;
            this.grid =  new Slick.Grid(this.gridDiv, data, columns, gridOptions);
            const grid = this.grid;
            this.wcOptions = wcOptions;
            if(wcOptions.trackRowHover){
                this.importHref(this.resolveUrl('x-slick-grid.mouseOverRow.html'), () =>{
                    enableMouseOverSlickGrid(this);
                }, null, true);
            }
            // grid.onMouseEnter.subscribe((e, d) =>{
            //     //console.log([e, d]);
            // })
            if(wcOptions){
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
                if(wcOptions.useCellSelectionModel){
                    const cellModelImpors: IDynamicImportStep[] = [{importURL: 'Slick.CellRangeSelector.html'}, {importURL: 'Slick.CellSelectionModel.html'}, {importURL: 'Slick.CellRangeDecorator.html'}];
                    importHrefs(cellModelImpors, this, () => {
                        grid.setSelectionModel(new Slick.CellSelectionModel())
                    })


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

        // getGrid: function(){
        //     return this.grid;
        // },
        // getGridDiv: function(){
        //     return this.gridDiv;
        // }
    });


}
