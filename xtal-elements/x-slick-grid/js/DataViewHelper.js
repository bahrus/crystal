///<reference path='SlickGrid.d.ts'/>
///<reference path='../x-slick-grid.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        function createDataViewWithFilter(data, filter, options) {
            var dataView = new Slick.Data.DataView({ inlineFilters: true });
            if (!options.containerFinder) {
                throw 'containerFinder required';
            }
            dataView['container'] = options.containerFinder();
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
            console.log('in addStandardRowHandling');
            if (!options.containerFinder) {
                throw 'containerFinder required';
            }
            dataView.onRowCountChanged.subscribe(function (e, args) {
                console.log('onRowCountChanged');
                var grid = options.containerFinder().grid;
                grid.updateRowCount();
                grid.render();
            });
            dataView.onRowsChanged.subscribe(function (e, args) {
                console.log('onRowsChanged');
                var grid = options.containerFinder().grid;
                grid.invalidateRows(args.rows);
                grid.render();
            });
        }
        elements.addStandardRowHandling = addStandardRowHandling;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=DataViewHelper.js.map