/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />

module TestElements {

    //For Add Name Resolver #1 https://github.com/bahrus/crystal/issues/1

    class MyParentModel {
    }

    @behavior(MyParentModel)
    @component("my-parent-element")
    @template(`
        <div>I am here</div>
    `)
    class MyParentElement extends polymer.Base{
    }

    MyParentElement.register();
}