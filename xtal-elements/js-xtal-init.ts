///<reference path='../bower_components/polymer/polymer.d.ts'/>
///<reference path='crystal.ts'/>

module crystal.elements {
    Polymer({
        is: 'js-xtal-init',
        properties:{
            innerTarget:{
                type: String
            },
            allowNativeElementAsTarget: {
                type: Boolean
            }
        },
        attached: function() {
            const actions = evalInner(this);
            let target = nextNonScriptSibling(this);
            if((target && target['set']) || this.allowNativeElementAsTarget) {
                this.processTarget(target, actions);
            }else{
                this.async(() => {
                    target = nextDomBindElement(this);
                    this.processTarget(target, actions);
                }, 1);


            }

        },

        processTarget: function(target: Element, actions){
            if (this.innerTarget) {
                target = target.querySelector(this.innerTarget);
            }
            performCustElActions(actions, target as HTMLElement);
        }
    });
}
