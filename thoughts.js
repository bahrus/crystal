var myModel = {
    prop1: {
        type: String
    },
    prop2: {
        type: Number
    },
    prop3: [
        {}
    ]
};
var myView = function () { return "\n    div" + myModel.prop1 + "span" + myModel.prop2 + "\n    " + myModel.prop3.forEach + "\n"; };
//separate lines means sibling 
//# sourceMappingURL=thoughts.js.map