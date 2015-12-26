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
        'myEmployee': rn(o => o.myEmployee),
        'changeEmployeeName': rn(o => o.changeEmployeeName),
        'myEmployee_Name': rn(o => o.myEmployee.Name),
    }

    interface IMyParentModel {
        myProp?: number;
        incrementMyProp?: () => void;
        onMyPropChange?: (newVal, oldVal) => void;
        myEmployee?: EmployeeInfo;
        changeEmployeeName?: (e?) => void;
    }

    class MyParentModel implements IMyParentModel {
        @property({
            observer: c.onMyPropChange
        })
        myProp: number;

        incrementMyProp() {
            this.myProp++;
        }


        @property()
        myEmployee: EmployeeInfo;

    
        changeEmployeeName(e) {
            if (this['set']) {
                this['set'](c.myEmployee_Name, 'Austin');
            } else {
                this.myEmployee.Name = 'Austin';
            }
        }

        @observe(c.myEmployee + '.*')
        @crystal.methodCallAction({
            do: pc => {
                console.log(pc);
            },
            before: true
        })
        onMyEmployeeChange(newVal, oldVal) { }
    }

    @behavior(MyParentModel)
    @component("my-parent-element")
    @template(`
        <div style="background-color:#cceeee">
            <div>myProp: [[${c.myProp}]]</div>
            <div on-click="${c.incrementMyProp}">Increment myProp</div>
            <div>Employee name: [[${c.myEmployee_Name}]]</div>
            <div on-click="${c.changeEmployeeName}">Change Employee Name</div>
            <my-child-element></my-child-element>
        </div>
    `)
    class MyParentElement extends polymer.Base implements IMyParentModel{

        @crystal.metaBind({
            elementSelector: 'my-child-element',
            setPath: c.myProp
        })
        onMyPropChange(newVal, oldVal) { }

        //myEmployee = new EmployeeInfo('Sydney', '102 Wallaby Lane');
        
    }

    MyParentElement.register();
}