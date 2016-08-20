///<reference path='SlickGrid.d.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        function createDataViewWithFilter(data, filter, options) {
            var dataView = new Slick.Data.DataView({ inlineFilters: true });
            dataView.beginUpdate();
            dataView.setItems(data);
            dataView.setFilter(filter);
            dataView.endUpdate();
            if (options && options.addStandardRowHandling) {
                if (!options.gridFinder) {
                    throw 'gridFinder required';
                }
                dataView.onRowCountChanged.subscribe(function (e, args) {
                    var grid = options.gridFinder();
                    grid.updateRowCount();
                    grid.render();
                });
                dataView.onRowsChanged.subscribe(function (e, args) {
                    var grid = options.gridFinder();
                    grid.invalidateRows(args.rows);
                    grid.render();
                });
            }
            return dataView;
        }
        elements.createDataViewWithFilter = createDataViewWithFilter;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=DataViewHelper.js.map