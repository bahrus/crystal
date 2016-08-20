///<reference path='SlickGrid.d.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        function createDataViewWithFilter(data, filter) {
            var dataView = new Slick.Data.DataView({ inlineFilters: true });
            dataView.beginUpdate();
            dataView.setItems(data);
            dataView.setFilter(filter);
            dataView.endUpdate();
            return dataView;
        }
        elements.createDataViewWithFilter = createDataViewWithFilter;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=DataViewHelper.js.map