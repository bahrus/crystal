///<reference path="x-slick-grid.ts"/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        elements.hoverClassName = 'x-slick-grid-hover';
        function getParallelRow($row) {
            var idx = $row.index();
            var canvasSide = $row.parent();
            var viewPortSide = canvasSide.parent();
            var paneSide = viewPortSide.parent();
            var otherPaneSide;
            var side;
            if (paneSide.hasClass('slick-pane-left')) {
                otherPaneSide = paneSide.next();
                side = 'right';
            }
            else {
                otherPaneSide = paneSide.prev();
                side = 'left';
            }
            var otherViewPortSide = otherPaneSide.children('.slick-viewport-' + side);
            var otherCanvasSide = otherViewPortSide.children('.grid-canvas-' + side);
            if (otherCanvasSide.length === 0)
                return $row;
            var otherCanvasSideChildren = otherCanvasSide[0].children;
            if (otherCanvasSideChildren.length <= idx)
                return $row;
            var $otherRow = $(otherCanvasSideChildren[idx]);
            // console.log({
            //     idx: idx,
            //     canvasSide: canvasSide,
            //     viewPortSide: viewPortSide,
            //     paneSide: paneSide,
            //     otherPaneSide: otherPaneSide,
            //     side: side,
            //     otherViewPortSide: otherViewPortSide,
            //     otherCanvasSide: otherCanvasSide,
            //     otherRow: $otherRow
            // });
            return $otherRow;
        }
        function enableMouseOverSlickGrid(gridCE) {
            var hasFrozenColumns = gridCE.options.frozenColumn;
            gridCE.grid.onMouseEnter.subscribe(function (e, d) {
                var row = e['currentTarget'].parentElement;
                var $row = $(row);
                $row.addClass(elements.hoverClassName);
                if (hasFrozenColumns) {
                    //const $parallelColumn = row.parentElement.parentElement.nextSibling;
                    var $otherRow = getParallelRow($row);
                    $otherRow.addClass(elements.hoverClassName);
                }
            });
            gridCE.grid.onMouseLeave.subscribe(function (e, d) {
                var row = e['currentTarget'].parentElement;
                var $row = $(row);
                $row.removeClass(elements.hoverClassName);
                if (hasFrozenColumns) {
                    var $otherRow = getParallelRow($row);
                    $otherRow.removeClass(elements.hoverClassName);
                }
            });
        }
        elements.enableMouseOverSlickGrid = enableMouseOverSlickGrid;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=x-slick-grid.mouseOverRow.js.map