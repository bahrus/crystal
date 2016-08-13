///<reference path="x-slick-grid.ts"/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        elements.hoverClassName = 'x-slick-grid-hover';
        function enableMouseOverSlickGrid(gridCE) {
            var hasFrozenColumns = gridCE.options.frozenColumn;
            gridCE.grid.onMouseEnter.subscribe(function (e, d) {
                var row = e['currentTarget'].parentElement;
                var $row = $(row);
                $row.addClass(elements.hoverClassName);
                if (hasFrozenColumns) {
                    //const $parallelColumn = row.parentElement.parentElement.nextSibling;
                    var idx = $row.index();
                    var canvasSide = $row.parent();
                    var viewPortSide = canvasSide.parent();
                    var paneSide = viewPortSide.parent();
                    var otherPaneSide = void 0;
                    var side = void 0;
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
                    var otherRow = $(otherCanvasSide[0].children[idx]);
                    otherRow.addClass(elements.hoverClassName);
                    console.log({
                        idx: idx,
                        canvasSide: canvasSide,
                        viewPortSide: viewPortSide,
                        paneSide: paneSide,
                        otherPaneSide: otherPaneSide,
                        side: side,
                        otherViewPortSide: otherViewPortSide,
                        otherCanvasSide: otherCanvasSide,
                        otherRow: otherRow
                    });
                }
            });
            gridCE.grid.onMouseLeave.subscribe(function (e, d) {
                var row = e['currentTarget'].parentElement;
                var $row = $(row);
                //$row.removeClass(hoverClassName);
            });
        }
        elements.enableMouseOverSlickGrid = enableMouseOverSlickGrid;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=x-slick-grid.mouseOverRow.js.map