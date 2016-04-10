///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {

    @component('xtal-property-grid')
    @template(
        `<div>
            <template is="dom-if" if="{{selectedObjectIsPrimitive}}">
                [[selectedObject]]
            </template>
            <template is="dom-if" if="{{selectedObjectIsObject}}">
                <table>
                    <template is="dom-repeat" items="{{subProperties}}">
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



        selectedObjectIsPrimitive: boolean;
        selectedObjectIsObject: boolean;
        selectedObjectType: string;
        subProperties: IProperty[];

        onSelectedObjectChange(){
            const typeOfObj = typeof this.selectedObject;
            switch(typeOfObj){
                case 'string':
                    this.selectedObjectIsPrimitive = true;
                    break;
                case 'object':
                    this.selectedObjectIsObject = true;
                    this.subProperties = [];
                    for(const key in this.selectedObject){
                        const val = this.selectedObject[key];
                        const prop : IProperty = {
                            type: typeof val,
                            name: key,
                            val: val,
                        };
                        this.subProperties.push(prop);
                    }
                    console.log(this.subProperties);
            }
            this.selectedObjectType = typeOfObj;
        }


    }
    XtalPropertyGrid.register();

    interface IProperty{
        type: string;
        name: string;
        val: any;
    }
}