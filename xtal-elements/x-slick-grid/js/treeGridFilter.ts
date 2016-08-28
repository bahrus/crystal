///<reference path='SlickGrid.d.ts'/>
///<reference path='../x-slick-grid.ts'/>

module crystal.elements{
    export interface ITreeNode{
        indent: number;
        id: string;
        parent: number;
        _collapsed: boolean;
    }

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

    export function filterOutCollapsedNodes<T>(item: T, container: IXSlickGridElement<T>) {
        let treeNode = (item as any) as ITreeNode;
        const data = container._data;
        if (treeNode.parent != null) {
            let parent = (data[treeNode.parent] as any) as ITreeNode;
            while (parent) {
                if (parent._collapsed ) {
                    return false;
                }
                parent = (data[parent.parent] as any) as ITreeNode;
            }
        }
        return true;
    }

    export function attachToggleClickEvent<T>(container: IXSlickGridElement<T>){
        container.grid.onClick.subscribe((e, args) =>{
            if ($(e['target']).hasClass("toggle")) {
                var item = container.dataProvider.getItem(args.row);
                if (item) {
                    if (!item._collapsed) {
                        item._collapsed = true;
                    } else {
                        item._collapsed = false;
                    }

                    container.dataProvider.updateItem(item.id, item);
                }
                e.stopImmediatePropagation();
            }
        });
    }
}
