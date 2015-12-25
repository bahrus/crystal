/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../crystal.ts"/>

module TestElements {

    //#region abbreviations
    function rn(getter: crystal.IGetter<IMyParentModel>) {
        return crystal.getName<IMyParentModel>(getter);
    }

    const c = {
        'myProp': rn(o => o.myProp),
        'incrementMyProp': rn(o => o.incrementMyProp),
        'onMyPropChange': rn(o => o.onMyPropChange),
    }

    interface IMyParentModel {
        myProp?: number;
        incrementMyProp?: () => void;
        onMyPropChange?: (newVal, oldVal) => void;
    }

    class MyParentModel implements IMyParentModel {
        @property({
            observer: c.onMyPropChange
        })
        myProp: number;

        incrementMyProp() {
            this.myProp++;
        }


        //onMyPropChange(newVal, oldVal) { }
    }

    @behavior(MyParentModel)
    @component("my-parent-element")
    @template(`
        <div>myProp: [[${c.myProp}]]</div>
        <div on-click="${c.incrementMyProp}">Increment myProp</div>
        <my-child-element></my-child-element>
    `)
    class MyParentElement extends polymer.Base implements IMyParentModel{

        @crystal.metaBind({
            elementSelector: 'my-child-element',
            setPath: c.myProp
        })
        onMyPropChange(newVal, oldVal) { }

        
    }

    MyParentElement.register();
}