///<reference path='SlickGrid.d.ts'/>

module crystal.elements{
    export interface ICreateDataViewOptions<T>{
        addStandardRowHandling?:  boolean;
        gridFinder?: () => Slick.Grid<T>;
    }
    export function createDataViewWithFilter<T>(data, filter, options?: ICreateDataViewOptions<T>){
        var dataView = new Slick.Data.DataView({ inlineFilters: true });
        dataView.beginUpdate();
        dataView.setItems(data);
        dataView.setFilter(filter);
        dataView.endUpdate();
        if(options && options.addStandardRowHandling){
            if(!options.gridFinder){
                throw 'gridFinder required';
            }
            dataView.onRowCountChanged.subscribe(function (e, args) {
                const grid = options.gridFinder();
                grid.updateRowCount();
                grid.render();
            });

            dataView.onRowsChanged.subscribe(function (e, args) {
                const grid = options.gridFinder();
                grid.invalidateRows(args.rows);
                grid.render();
            });
        }
        return dataView;
    }
}
