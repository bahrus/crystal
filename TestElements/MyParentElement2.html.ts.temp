/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../crystal.ts"/>
/// <reference path="EmployeeInfo.ts"/>


module TestElements {

    const myParentElementTemplate = (model: MyParentElement2) =>`
    <div style="background-color:#cceeee">
        <div>[[${model.message}]]</div>
        <div>myProp: [[${model.myProp}]]</div>
        <div on-click="${model.incrementMyProp}">Increment myProp</div>
        <div>Employee name: [[${model.myEmployee_Name}]]</div>
        <div on-click="${model.changeEmployeeName}">Change Employee Name</div>
        <content></content>
        <my-child-element></my-child-element>
    </div>
`;
    //<script>
    class MyParentElement2 extends polymer.Base {

        message: string;
        myEmployee_Name: string;
        
        @property({
            //observer: c.onMyPropChange
        })
        myProp:number;

        incrementMyProp() {
            this.myProp++;
        }


        @property()
        myEmployee:EmployeeInfo;


        changeEmployeeName(e) {
            if (this['set']) {
                //this['set'](c.myEmployee_Name, 'Austin');
            } else {
                this.myEmployee.Name = 'Austin';
            }
        }

        //@observe(c.myEmployee + '.*')
        @crystal.methodCallAction({
            do: pc => {
                console.log(pc);
            },
            before: true
        })
        onMyEmployeeChange(newVal, oldVal) {
        }
    }
    //</script>
    
}