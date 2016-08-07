///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>

module crystal.elements {
    export interface IXSlickGridOptions{
        trackCurrentRow?:boolean;
        trackColumnChanges?: boolean;
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
            }

        },
        ready: function() {
            const thisGrid = this.$$('#grid');
            const $thisGrid = $(thisGrid);
            $thisGrid
                .css('height', this.height)
                .css('width', this.width);
            this.gridDiv = $thisGrid;
            console.log(this.fillContainer);
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
        setInitialData(data: any[], columns: Slick.Column<any>[], gridOptions?: Slick.GridOptions<any>,  wcOptions?: IXSlickGridOptions){
            this.data = data;
            this.columns = columns;
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
