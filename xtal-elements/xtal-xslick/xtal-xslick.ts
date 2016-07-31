///<reference path='../../bower_components/polymer/polymer.d.ts'/>
///<reference path='js/SlickGrid.d.ts'/>
///<reference path='../../bower_components/jquery/jquery.d.ts'/>
declare const $$;
module crystal.elements {
    Polymer({
        is: 'xtal-xslick',
        attached: function(){
            //debugger;
        },
        data: null,
        columns: null,
        options: null,
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

        },
        ready: function() {
            //var grid;


            const thisGrid = this.$$('#grid');
            const $thisGrid = $(thisGrid);
            $thisGrid
                .css('height', this.height)
                .css('width', this.width);
            this.gridDiv = $thisGrid;
            // $(function () {
            //
            //     //var myGrid = document.querySelector('#myGrid');
            //     //var $myGrid = $(myGrid);
            //     //const thisGrid = Polymer.dom(this.root).querySelector('#grid');
            //     //const $thisGrid = $(thisGrid);
            //     //debugger;
            //     grid = new Slick.Grid($thisGrid, data, columns, options);
            // })
        },
        setInitialData(data: any[], columns: Slick.Column<any>[], gridOptions: Slick.GridOptions<any>){
            this.grid =  new Slick.Grid(this.gridDiv, data, columns, gridOptions);
        }
    });


}
