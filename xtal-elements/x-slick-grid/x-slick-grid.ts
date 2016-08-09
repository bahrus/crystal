///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>

module crystal.elements {
    export interface IXSlickGridOptions{
        trackCurrentRow?:boolean;
        trackColumnChanges?: boolean;
        trackContextMenu?:boolean;
        useCellSelectionModel?: boolean;
    }

    export interface IXSlickGridColumn<T> extends Slick.Column<T>{
        editorNSFn?: string[]
    }
    Polymer({
        is: 'x-slick-grid',
        data: null,
        //columns: null,
        get columns(){
            return this.grid.getColumns();
        },
        gridOptions: null,
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
        ready: function() {
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
                if(resize){
                    this.grid.resizeCanvas();
                }

            }
        },
        setInitialData(data: any[], columns: IXSlickGridColumn<any>[], gridOptions?: Slick.GridOptions<any>,  wcOptions?: IXSlickGridOptions){
            this.data = data;
            this.columns = columns;
            for(let i = 0, ii = columns.length; i < ii; i++){
                let col = columns[i];
                if(col.editorNSFn && !col.editor){
                    let editorFn = window;
                    const editorNSFn = col.editorNSFn;
                    for(let j = 0, jj = editorNSFn.length; j < jj; j++){
                        const token = editorNSFn[j];
                        editorFn = editorFn[token];
                    }
                    col.editor = editorFn;
                }
            }
            this.gridOptions = gridOptions;
            this.grid =  new Slick.Grid(this.gridDiv, data, columns, gridOptions);
            const grid = this.grid;
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
                    grid.setSelectionModel(new Slick['CellSelectionModel']());
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
        getSelectedRow(){
            if(this.clickedRowIndex === -1) return null;
            return this.data[this.clickedRowIndex];
        },
        getGrid: function(){
            return this.grid;
        },
        getGridDiv: function(){
            return this.gridDiv;
        }
    });


}
