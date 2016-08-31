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
        function collapseAndHideNodes(container, searchString, test) {
        }
        elements.collapseAndHideNodes = collapseAndHideNodes;
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
        var ampRegExp = /&/g;
        var ltRegExp = /</g;
        var gtRegExp = />/g;
        function nodeColumnFormatter(row, cell, value, columnDef, dataContext, container) {
            console.log('in nodeColumnFormatter');
            value = value.replace(ampRegExp, "&amp;").replace(ltRegExp, "&lt;").replace(gtRegExp, "&gt;");
            var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
            var data = container._data;
            var idx = container.dataProvider.getIdxById(dataContext.id);
            if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
                if (dataContext._collapsed) {
                    return spacer + " <span class='xsg_toggle xsg_expand'></span>&nbsp;" + value;
                }
                else {
                    return spacer + " <span class='xsg_toggle xsg_collapse'></span>&nbsp;" + value;
                }
            }
            else {
                return spacer + " <span class='xsg_toggle'></span>&nbsp;" + value;
            }
        }
        elements.nodeColumnFormatter = nodeColumnFormatter;
        function setAllItemsToValue(container, fieldName, value) {
            var items = container.dataProvider.getItems();
            items.forEach(function (item) {
                item._collapsed = true;
            });
            container.dataProvider.refresh(container);
            container.grid.invalidate();
        }
        function collapseAll() {
            var container = this;
            setAllItemsToValue(container, '_collapsed', true);
        }
        elements.collapseAll = collapseAll;
        function expandAll() {
            var container = this;
            setAllItemsToValue(container, '_collapsed', false);
        }
        elements.expandAll = expandAll;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=treeGridHelper.js.map