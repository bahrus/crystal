const myModel = {
    prop1:{
        type: String
    },
    prop2:{
        type: Number
    },
    prop3:[
        {
            subProp1:{
                type: Number
            },
            subProp2:{
                type: String
            },
            subProp3:{
                type: String
            }
        }
    ]
}

const myView = x => `
    div[my-attrib=${myModel.prop2}]${myModel.prop1}
    table>tr*${myModel.prop3.map(p=>`
        [id=${p.subProp3}]
        td${p.subProp2}
    `)}
`;

const test2 = `
    div${() => myModel.prop1}
    table>tr*${() => myModel.prop3.map(p=>`
        [id=$]
    `)}
`;

//separate lines means sibling