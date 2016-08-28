///<reference path='SlickGrid.d.ts'/>
///<reference path='../x-slick-grid.ts'/>

module crystal.elements{
    export interface ITreeNode{
        indent: number;
        id: string;
        parent: number;
        _collapsed: boolean;
    }



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
            if ($(e['target']).hasClass("xsg_toggle")) {
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
