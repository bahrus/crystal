var myModel = {
    prop1: {
        type: String
    },
    prop2: {
        type: Number
    },
    prop3: [
        {
            subProp1: {
                type: Number
            },
            subProp2: {
                type: String
            },
            subProp3: {
                type: String
            }
        }
    ]
};
var myView = function (x) { return "\n    div[my-attrib=" + myModel.prop2 + "]" + myModel.prop1 + "\n    table>tr*" + myModel.prop3.map(function (p) { return "\n        [id=" + p.subProp3 + "]\n        td" + p.subProp2 + "\n    "; }) + "\n"; };
var test2 = "\n    div" + function () { return myModel.prop1; } + "\n    table>tr*" + function () { return myModel.prop3.map(function (p) { return "\n        [id=$]\n    "; }); } + "\n";
//separate lines means sibling 
//# sourceMappingURL=thoughts.js.map