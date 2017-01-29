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
                    if (treeNode._hasAncestorThatMatchesFilter)
                        return true;
                    if (treeNode._matchesFilter)
                        return true;
                    if (treeNode._hasDescendantThatMatchesFilter)
                        return true;
                    return false;
                }
                return true;
            }
            xslickgrid.filterNode = filterNode;
            function linkChildren(container) {
                //const nodeLookup: {[key: string] : ITreeNode[]} = {};
                var hasCheckBoxSelector = container.useSlickCheckboxSelectColumn;
                var data = container._data;
                //children always come after parent
                data.forEach(function (row) { return delete row.childIndices; });
                for (var i = 0, ii = data.length; i < ii; i++) {
                    var node = data[i];
                    if (node.parent !== null) {
                        var parent_2 = data[node.parent];
                        if (parent_2) {
                            if (!parent_2.childIndices)
                                parent_2.childIndices = [];
                            parent_2.childIndices.push(i);
                        }
                    }
                }
            }
            xslickgrid.linkChildren = linkChildren;
            function analyzeTreeNodes(itemFilter) {
                var container = this;
                linkChildren(container);
                var data = container._data;
                for (var i = 0, ii = data.length; i < ii; i++) {
                    var node = data[i];
                    var item = node;
                    node._matchesFilter = itemFilter(item);
                    node._hasDescendantThatMatchesFilter = false;
                    node._hasAncestorThatMatchesFilter = false;
                    node._collapsed = true;
                }
                var nodesThatMatchFilter = data.filter(function (node) { return node._matchesFilter; });
                for (var i = 0, ii = nodesThatMatchFilter.length; i < ii; i++) {
                    var node = nodesThatMatchFilter[i];
                    markChildren(node, data);
                    if (node.parent !== null) {
                        var parent_3 = data[node.parent];
                        while (parent_3) {
                            if (parent_3._hasDescendantThatMatchesFilter)
                                break;
                            parent_3._hasDescendantThatMatchesFilter = true;
                            if (!parent_3._matchesFilter) {
                                parent_3._collapsed = false;
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
                var children = node.childIndices;
                if (!children)
                    return;
                for (var i = 0, ii = children.length; i < ii; i++) {
                    var child = nodes[children[i]];
                    child._hasAncestorThatMatchesFilter = true;
                    markChildren(child, nodes);
                }
            }
            function sortColumn(args) {
                var container = this;
                linkChildren(container);
                var fieldName = args.sortCol.field;
                var data = container._data;
                // debugger;
                // console.log('data', data);
                //const data_clone = data.slice(0); //Internet explorer starts modifying the order of an array while sorting
                var compareFn = function (lhs, rhs) {
                    var lhsVal = data[lhs][fieldName];
                    var rhsVal = data[rhs][fieldName];
                    if (lhsVal === rhsVal)
                        return 0;
                    if (lhsVal > rhsVal)
                        return args.sortAsc ? 1 : -1;
                    return args.sortAsc ? -1 : 1;
                };
                var root = {
                    childIndices: [],
                };
                for (var i = 0, ii = data.length; i < ii; i++) {
                    var row = data[i];
                    if (row.parent === null)
                        root.childIndices.push(i);
                }
                sortChildIndices(root, compareFn, data);
                console.log('root', root);
                var newData = [];
                addData(root, newData, data, {
                    parentIdx: -1,
                    currentIndx: 0,
                });
                // console.log('newData', newData);
                // debugger;
                container._data = newData;
                //console.log(container._data);
                linkChildren(container);
                console.log(container._data);
                var dataProvider = container.dataProvider;
                dataProvider.beginUpdate();
                dataProvider.setItems(newData);
                container._data = newData;
                dataProvider.endUpdate();
                //container.setInitialData()
                console.log('rerender');
                var grid = container.grid;
                grid.invalidate();
                grid.render();
            }
            xslickgrid.sortColumn = sortColumn;
            function sortChildIndices(node, compareFn, data) {
                var childIndices = node.childIndices;
                if (!childIndices)
                    return;
                node.sortedChildIndices = childIndices.slice(0);
                node.sortedChildIndices.sort(compareFn);
                for (var i = 0, ii = childIndices.length; i < ii; i++) {
                    var childIdx = childIndices[i];
                    var child = data[childIdx];
                    sortChildIndices(child, compareFn, data);
                }
            }
            function addData(node, newData, data, listPointer) {
                // if(!listPointer.isArtificial){
                //     newData.push(node);
                // }else{
                //     listPointer.isArtificial = false;
                // }
                var sortedChildIndices = node.sortedChildIndices;
                var parentIdx = listPointer.parentIdx;
                if (!sortedChildIndices)
                    return;
                for (var i = 0, ii = sortedChildIndices.length; i < ii; i++) {
                    var childIdx = sortedChildIndices[i];
                    var child = data[childIdx];
                    if (parentIdx !== -1) {
                        child.parent = parentIdx;
                    }
                    newData.push(child);
                    listPointer.parentIdx = listPointer.currentIndx;
                    listPointer.currentIndx++;
                    addData(child, newData, data, listPointer);
                }
            }
            // function compare(LHS: ITreeNode, RHS: ITreeNode, fieldName: string){
            //     if(LHS.parent === LHS.parent){
            //         if(LHS[fieldName] === RHS[fieldName]) return 0;
            //     }
            // }
            function collapseAndHideNodes(container, searchString, test) {
            }
            xslickgrid.collapseAndHideNodes = collapseAndHideNodes;
            function attachToggleClickEvent(container, useSlickCheckboxSelectColumn) {
                container.grid.onClick.subscribe(function (e, args) {
                    var target = e['target'];
                    var $target = $(target);
                    if ($target.hasClass('xsg_toggle')) {
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
                    else if (useSlickCheckboxSelectColumn) {
                        if ($(target.parentNode).hasClass('slick-cell-checkboxsel')) {
                            //linkChildren(container);
                            var item = container.dataProvider.getItem(args.row);
                            if (target.checked) {
                                target.indeterminate = false;
                                checkItemAndChildrenRecursively(container.dataProvider, item, true);
                            }
                            var grid = container.grid;
                            grid.invalidate();
                            grid.render();
                        }
                    }
                });
            }
            xslickgrid.attachToggleClickEvent = attachToggleClickEvent;
            function checkItemAndChildrenRecursively(dataProvider, item, value) {
                item._checked = true;
                if (item.childIndices) {
                    for (var i = 0, ii = item.childIndices.length; i < ii; i++) {
                        var childIdx = item.childIndices[i];
                        var childItem = dataProvider.getItem(childIdx);
                        checkItemAndChildrenRecursively(dataProvider, childItem, value);
                    }
                }
            }
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