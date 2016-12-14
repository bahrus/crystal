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
            }
        }
    ]
}

const myView = x => `
    div[my-attrib=${myModel.prop2}]${myModel.prop1}
    table>tr*${myModel.prop3.map(p=>`
        td${p.subProp2}
    `)}
`;

//separate lines means sibling