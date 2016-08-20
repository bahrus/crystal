///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {

    @component('xtal-property-grid')
    @template(
        `<div>
            <template is="dom-if" if="{{selectedObjectInfo.isPrimitive}}">
                [[selectedObjectInfo.val]]
            </template>
            <template is="dom-if" if="{{selectedObjectInfo.isObject}}">
                i am here
                <table>
                    <template is="dom-repeat" items="{{selectedObjectInfo.subProperties}}">
                    <tr>
                        <td>{{item.name}}</td>

                    </tr>
                    </template>
                </table>
            </template>
         </div>`
    )
    class XtalPropertyGrid extends polymer.Base {

        @property({
            observer: 'onSelectedObjectChange',
            reflectToAttribute: true,
            type: Object,
        })
        selectedObject;

        //@property({
        //    type: Object,
        //})
        selectedObjectInfo: IProperty;

        //selectedObjectIsPrimitive: boolean;
        //selectedObjectIsObject: boolean;
        //selectedObjectType: string;
        //subProperties: IProperty[];

        onSelectedObjectChange(){
            const typeOfObj = typeof this.selectedObject;
            const selectedObjectInfo : IProperty = {};
            switch(typeOfObj){
                case 'string':
                    selectedObjectInfo.isPrimitive = true;
                    selectedObjectInfo.val = this.selectedObject;
                    break;
                case 'object':
                    selectedObjectInfo.isObject = true;
                    selectedObjectInfo.subProperties = [];
                    for(const key in this.selectedObject){
                        const val = this.selectedObject[key];
                        const prop : IProperty = {
                            type: typeof val,
                            name: key,
                            val: val,
                        };
                        selectedObjectInfo.subProperties.push(prop);
                    }
            }
            selectedObjectInfo.type = typeOfObj;
            this.set('selectedObjectInfo', selectedObjectInfo);
            //console.log(this);
        }


    }
    XtalPropertyGrid.register();

    interface IProperty{
        type?: string;
        name?: string;
        val?: any;
        isPrimitive?: boolean;
        isObject?: boolean;
        subProperties?: IProperty[];
    }
}