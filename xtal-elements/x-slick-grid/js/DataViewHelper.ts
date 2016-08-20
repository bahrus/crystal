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
            addStandardRowHandling(dataView, options);
        }
        return dataView;
    }

    export function addStandardRowHandling<T>(dataView:  Slick.Data.DataView<T>, options: ICreateDataViewOptions<T>){
        console.log('in addStandardRowHandling');
        if(!options.gridFinder){
            throw 'gridFinder required';
        }
        dataView.onRowCountChanged.subscribe(function (e, args) {
            console.log('onRowCountChanged');
            const grid = options.gridFinder();
            grid.updateRowCount();
            grid.render();
        });

        dataView.onRowsChanged.subscribe(function (e, args) {
            console.log('onRowsChanged');
            const grid = options.gridFinder();
            grid.invalidateRows(args.rows);
            grid.render();
        });
    }
}
