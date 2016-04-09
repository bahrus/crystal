///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {

    @component('xtal-property-grid')
    @template(
        `<div>
            <template is="dom-if" if="{{selectedObjectIsPrimitive}}">
                I am here [[selectedObject]]
            </template>
         </div>`
    )
    class XtalPropertyGrid extends polymer.Base {

        _selectedObject: Object;
//
        @property({
            observer: 'onSelectedObjectChange'
        })
        selectedObject;
        //get selectedObject(){
        //    return this._selectedObject;
        //}
        //set selectedObject(obj: any){

        //}

        selectedObjectIsPrimitive: boolean;
        selectedObjectType: string;


        onSelectedObjectChange(){
                debugger;
                const typeOfObj = typeof this.selectedObject;
                switch(typeOfObj){
                    case 'string':
                        this.selectedObjectIsPrimitive = true;
                        break;
                }
                this.selectedObjectType = typeOfObj;
        }
    }
    XtalPropertyGrid.register();

    interface IProperty{
        type: string;
    }
}