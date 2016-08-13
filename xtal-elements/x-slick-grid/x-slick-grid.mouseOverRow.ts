///<reference path="x-slick-grid.ts"/>

module crystal.elements{
    export const hoverClassName = 'x-slick-grid-hover';

    function getParallelRow($row: JQuery) : JQuery{
        const idx = $row.index();
        const canvasSide = $row.parent();
        const viewPortSide = canvasSide.parent();
        const paneSide = viewPortSide.parent();
        let otherPaneSide;
        let side: string;
        if(paneSide.hasClass('slick-pane-left')){
            otherPaneSide = paneSide.next();
            side = 'right';
        }else{
            otherPaneSide = paneSide.prev();
            side = 'left'
        }
        const otherViewPortSide = otherPaneSide.children('.slick-viewport-' + side);
        const otherCanvasSide = otherViewPortSide.children('.grid-canvas-' + side);
        if(otherCanvasSide.length === 0) return $row;
        const otherCanvasSideChildren = otherCanvasSide[0].children;
        if(otherCanvasSideChildren.length <= idx) return $row;
        const $otherRow = $(otherCanvasSideChildren[idx]);
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
        return $otherRow
    }

    export function enableMouseOverSlickGrid<T>(gridCE: IXSlickGridElement<T>){
        const hasFrozenColumns = gridCE.options.frozenColumn;
        gridCE.grid.onMouseEnter.subscribe((e, d) =>{
            const row = e['currentTarget'].parentElement;
            const $row = $(row);
            $row.addClass(hoverClassName);
            if(hasFrozenColumns){
                //const $parallelColumn = row.parentElement.parentElement.nextSibling;
                const $otherRow = getParallelRow($row);
                $otherRow.addClass(hoverClassName);
            }
        });
        gridCE.grid.onMouseLeave.subscribe((e,d )=>{
            const row = e['currentTarget'].parentElement;
            const $row = $(row);
            $row.removeClass(hoverClassName);
            if(hasFrozenColumns){
                const $otherRow = getParallelRow($row);
                $otherRow.removeClass(hoverClassName);
            }
        })
    }
}