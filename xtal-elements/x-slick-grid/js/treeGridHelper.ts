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

    const ampRegExp = /&/g;
    const ltRegExp = /</g;
    const gtRegExp = />/g;
    export function nodeColumnFormatter<T extends ITreeNode>(row: number, cell: number, value: any,
                                           columnDef : Slick.Column<T>, dataContext: ITreeNode, container: IXSlickGridElement<T>){
        console.log('in nodeColumnFormatter');
        value = value.replace(ampRegExp, "&amp;").replace(ltRegExp, "&lt;").replace(gtRegExp, "&gt;");
        var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
        const data = container._data;
        var idx = container.dataProvider.getIdxById(dataContext.id);
        if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
            if (dataContext._collapsed) {
                return spacer + " <span class='xsg_toggle xsg_expand'></span>&nbsp;" + value;
            } else {
                return spacer + " <span class='xsg_toggle xsg_collapse'></span>&nbsp;" + value;
            }
        } else {
            return spacer + " <span class='xsg_toggle'></span>&nbsp;" + value;
        }
    }

    export function collapseAll<T>(){//(container: IXSlickGridElement<T>){
        const container = this as IXSlickGridElement<T>;
        const items = container.dataProvider.getItems();
        items.forEach(item => {
            item._collapsed = true;
        })
        container.dataProvider.refresh(container);
        container.grid.invalidate();
    }
}
