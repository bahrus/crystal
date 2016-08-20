///<reference path='SlickGrid.d.ts'/>

module crystal.elements{
    export function createDataViewWithFilter(data, filter){
        var dataView = new Slick.Data.DataView({ inlineFilters: true });
        dataView.beginUpdate();
        dataView.setItems(data);
        dataView.setFilter(filter);
        dataView.endUpdate();
        return dataView;
    }
}
