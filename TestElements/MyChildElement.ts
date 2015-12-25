module TestElements {
    @component("my-child-element")
    @template(`
        <div style="background-color:#eeee77">
            <div>My Child component</div>
            <div>myProp: [[myProp]]</div>
        </div>
    `)
    class MyChildElement extends polymer.Base{
    }

    MyChildElement.register();
}