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
