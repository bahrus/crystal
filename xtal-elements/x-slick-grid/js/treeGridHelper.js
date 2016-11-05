///<reference path='SlickGrid.d.ts'/>
///<reference path='../x-slick-grid.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        var xslickgrid;
        (function (xslickgrid) {
            function filterNode(item, container, calledFilterTreeNodes) {
                var treeNode = item;
                var data = container._data;
                if (treeNode.parent !== null) {
                    var parent_1 = data[treeNode.parent];
                    while (parent_1) {
                        if (parent_1._collapsed) {
                            return false;
                        }
                        if (parent_1.parent === null)
                            break;
                        parent_1 = data[parent_1.parent];
                    }
                }
                if (calledFilterTreeNodes) {
                    if (treeNode._hasParentThatMatchesFilter)
                        return true;
                    if (treeNode._matchesFilter)
                        return true;
                    if (treeNode._hasParentThatMatchesFilter)
                        return true;
                    return false;
                }
                return true;
            }
            xslickgrid.filterNode = filterNode;
            function linkChildren(container) {
                //const nodeLookup: {[key: string] : ITreeNode[]} = {};
                var data = container._data;
                //children always come after parent
                data.forEach(function (row) { return delete row.children; });
                for (var i = 0, ii = data.length; i < ii; i++) {
                    var node = data[i];
                    if (node.parent !== null) {
                        var parent_2 = data[node.parent];
                        if (parent_2) {
                            if (!parent_2.children)
                                parent_2.children = [];
                            parent_2.children.push(i);
                        }
                    }
                }
            }
            xslickgrid.linkChildren = linkChildren;
            function analyzeTreeNodes(container, itemFilter) {
                linkChildren(container);
                var data = container._data;
                for (var i = 0, ii = data.length; i < ii; i++) {
                    var node = data[i];
                    var item = node;
                    node._matchesFilter = itemFilter(item);
                    node._hasChildThatMatchesFilter = false;
                    node._hasParentThatMatchesFilter = false;
                    if (node._matchesFilter)
                        node._collapsed = true;
                }
                var nodesThatMatchFilter = data.filter(function (node) { return node._matchesFilter; });
                for (var i = 0, ii = nodesThatMatchFilter.length; i < ii; i++) {
                    var node = nodesThatMatchFilter[i];
                    markChildren(node, data);
                    if (node.parent !== null) {
                        var parent_3 = data[node.parent];
                        while (parent_3) {
                            if (parent_3._hasChildThatMatchesFilter)
                                break;
                            if (!parent_3._matchesFilter) {
                                parent_3._collapsed = false;
                                parent_3._hasChildThatMatchesFilter = true;
                            }
                            else {
                                break;
                            }
                            if (parent_3.parent !== null) {
                                parent_3 = data[parent_3.parent];
                            }
                            else {
                                //parent = null;
                                break;
                            }
                        }
                    }
                }
            }
            xslickgrid.analyzeTreeNodes = analyzeTreeNodes;
            function markChildren(node, nodes) {
                console.log(nodes.length);
                var children = node.children;
                if (!children)
                    return;
                for (var i = 0, ii = children.length; i < ii; i++) {
                    var child = nodes[children[i]];
                    child._hasParentThatMatchesFilter = true;
                    markChildren(child, nodes);
                }
            }
            function collapseAndHideNodes(container, searchString, test) {
            }
            xslickgrid.collapseAndHideNodes = collapseAndHideNodes;
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
            xslickgrid.attachToggleClickEvent = attachToggleClickEvent;
            var ampRegExp = /&/g;
            var ltRegExp = /</g;
            var gtRegExp = />/g;
            function nodeColumnFormatter(row, cell, value, columnDef, dataContext, container) {
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
            xslickgrid.nodeColumnFormatter = nodeColumnFormatter;
            function setAllItemsToValue(container, fieldName, value) {
                var items = container.dataProvider.getItems();
                items.forEach(function (item) {
                    item._collapsed = value;
                });
                container.dataProvider.refresh(container);
                container.grid.invalidate();
            }
            function collapseAll() {
                var container = this;
                setAllItemsToValue(container, '_collapsed', true);
            }
            xslickgrid.collapseAll = collapseAll;
            function expandAll() {
                var container = this;
                setAllItemsToValue(container, '_collapsed', false);
            }
            xslickgrid.expandAll = expandAll;
        })(xslickgrid = elements.xslickgrid || (elements.xslickgrid = {}));
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=treeGridHelper.js.map