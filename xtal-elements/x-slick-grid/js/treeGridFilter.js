///<reference path='SlickGrid.d.ts'/>
///<reference path='../x-slick-grid.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        function filterOutCollapsedNodes(item, container) {
            var treeNode = item;
            var data = container._data;
            if (treeNode.parent != null) {
                var parent_1 = data[treeNode.parent];
                while (parent_1) {
                    if (parent_1._collapsed) {
                        return false;
                    }
                    parent_1 = data[parent_1.parent];
                }
            }
            return true;
        }
        elements.filterOutCollapsedNodes = filterOutCollapsedNodes;
        function attachToggleClickEvent(container) {
            container.grid.onClick.subscribe(function (e, args) {
                if ($(e['target']).hasClass("xsg_toggle")) {
                    var item = container.dataProvider.getItem(args.row);
                    if (item) {
                        if (!item._collapsed) {
                            item._collapsed = true;
                        }
                        else {
                            item._collapsed = false;
                        }
                        container.dataProvider.updateItem(item.id, item);
                    }
                    e.stopImmediatePropagation();
                }
            });
        }
        elements.attachToggleClickEvent = attachToggleClickEvent;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=treeGridFilter.js.map