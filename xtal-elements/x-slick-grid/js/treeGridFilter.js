///<reference path='SlickGrid.d.ts'/>
///<reference path='../x-slick-grid.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        //export function
        // var TaskNameFormatter = function (row, cell, value, columnDef, dataContext) {
        //     value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        //     var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
        //     var idx = xslick.dataProvider.getIdxById(dataContext.id);
        //     if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
        //         if (dataContext._collapsed) {
        //             return spacer + " <span class='toggle expand'></span>&nbsp;" + value;
        //         } else {
        //             return spacer + " <span class='toggle collapse'></span>&nbsp;" + value;
        //         }
        //     } else {
        //         return spacer + " <span class='toggle'></span>&nbsp;" + value;
        //     }
        // };
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
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=treeGridFilter.js.map