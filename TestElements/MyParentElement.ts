/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../crystal.ts"/>

module TestElements {

    //#region abbreviations
    function rn(getter: crystal.IGetter<MyParentModel>) {
        return crystal.getName<MyParentModel>(getter);
    }

    const c = {
        'myProp': rn(o => o.myProp),
    }

    class MyParentModel {
        myProp: number;
    }

    @behavior(MyParentModel)
    @component("my-parent-element")
    @template(`
        <div>myProp: [[${c.myProp}]]</div>
        <my-child-element></my-child-element>
    `)
    class MyParentElement extends polymer.Base{
        myProp = 42;  // direct initialization
    }

    MyParentElement.register();
}