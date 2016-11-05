///<reference path='SlickGrid.d.ts'/>
///<reference path='../x-slick-grid.ts'/>

module crystal.elements.xslickgrid{
    export interface ITreeNode{
        indent: number;
        id: string;
        parent: number;
        children?: number[];
        _collapsed: boolean;
        _matchesFilter: boolean;
        _hasChildThatMatchesFilter: boolean;
        _hasParentThatMatchesFilter: boolean;
    }



    export function filterNode<T>(item: T, container: IXSlickGridElement<T>, calledFilterTreeNodes?: boolean) {
        let treeNode = (item as any) as ITreeNode;
        const data = container._data;
        if (treeNode.parent !== null) {
            let parent = (data[treeNode.parent] as any) as ITreeNode;
            while (parent) {
                if (parent._collapsed ) {
                    return false;
                }
                if(parent.parent === null) break;
                parent = (data[parent.parent] as any) as ITreeNode;
            }
        }
        if(calledFilterTreeNodes){
            if(treeNode._hasParentThatMatchesFilter) return true;
            if(treeNode._matchesFilter) return true;
            if(treeNode._hasParentThatMatchesFilter) return true;
            return false;
        }
        return true;
    }

    export function linkChildren<T>(container: IXSlickGridElement<T>){
        //const nodeLookup: {[key: string] : ITreeNode[]} = {};

        const data = (container._data as any) as ITreeNode[];
        //children always come after parent
        data.forEach(row => delete row.children);
        for(let i = 0, ii = data.length; i < ii; i++){
            const node = data[i];
            if(node.parent !== null) {
                const parent = (data[node.parent] as any) as ITreeNode;
                if(parent){
                    if(!parent.children) parent.children = [];
                    parent.children.push(i);
                }
            }
        }
    }

    export function analyzeTreeNodes<T>(container: IXSlickGridElement<T>, itemFilter: (item: T) => boolean){
        linkChildren(container);
        const data = (container._data as any) as ITreeNode[];
        for(let i = 0, ii = data.length; i < ii; i++) {
            const node = data[i];
            const item = (node as any) as T;
            node._matchesFilter = itemFilter(item);
            node._hasChildThatMatchesFilter = false;
            node._hasParentThatMatchesFilter = false;
            if(node._matchesFilter) node._collapsed = true;
        }
        const nodesThatMatchFilter = data.filter(node => node._matchesFilter);
        for(let i = 0, ii = nodesThatMatchFilter.length; i < ii; i++){
            const node = nodesThatMatchFilter[i];
            markChildren(node, data);
            if(node.parent !== null){
                let parent = (data[node.parent] as any) as ITreeNode;
                while(parent){
                    if(parent._hasChildThatMatchesFilter) break;
                    if(!parent._matchesFilter){
                        parent._collapsed = false;
                        parent._hasChildThatMatchesFilter = true;
                    }else{
                        break;
                    }
                    if(parent.parent !==null){
                        parent = (data[parent.parent] as any) as ITreeNode;
                    }else{
                        //parent = null;
                        break;
                    }
                }
                
            }
        }

    }

    function markChildren(node: ITreeNode, nodes: ITreeNode[]){
        const children = node.children;
        if(!children) return;
        for(let i = 0, ii = children.length; i < ii; i++){
            const child = nodes[ children[i] ];
            child._hasParentThatMatchesFilter = true;
            markChildren(child, nodes);
        }
    }

    export function collapseAndHideNodes<T>(container: IXSlickGridElement<T>, searchString: string,
                                            test: (container: IXSlickGridElement<T>, item: T, searchString: string) => boolean){


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

    function setAllItemsToValue<T>(container: IXSlickGridElement<T>, fieldName: string, value: any){
        const items = container.dataProvider.getItems();
        items.forEach(item => {
            item._collapsed = value;
        })
        container.dataProvider.refresh(container);
        container.grid.invalidate();
    }
    export function collapseAll<T>(){//(container: IXSlickGridElement<T>){
        const container = this as IXSlickGridElement<T>;
        setAllItemsToValue<T>(container, '_collapsed', true);
    }
    export function expandAll<T>(){
        const container = this as IXSlickGridElement<T>;
        setAllItemsToValue<T>(container, '_collapsed', false);
    }
}
