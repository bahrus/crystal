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
                addStandardRowHandling(dataView, options);
            }
            return dataView;
        }
        elements.createDataViewWithFilter = createDataViewWithFilter;
        function addStandardRowHandling(dataView, options) {
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
        elements.addStandardRowHandling = addStandardRowHandling;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=DataViewHelper.js.map