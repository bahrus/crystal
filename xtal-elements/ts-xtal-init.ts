///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements{
    @component(crystal.tsXtalInitTagName)
    @template(`<span style="display: none">iah</span>`)
    class TSXtalInit extends polymer.Base implements crystal.IDecorator {
        @property()
        innerTarget: string;
        
        @property()
        isDecoratorElement = true;

        attached() {
            const actions = evalInner(this, true);
            let target = nextNonScriptSibling(this);
            if(target && target['set']){
                this.processTarget(target, actions);
            }else{
                this.async(() => {
                    target = nextDomBindElement(this);
                    this.processTarget(target, actions);
                }, 1);


            }

        }

        processTarget(target: Element, actions){
            if (this.innerTarget) {
                target = <polymer.Base> target.querySelector(this.innerTarget);
            }
            performCustElActions(actions, <polymer.Base> target);
        }
    }
    
    TSXtalInit.register();
}
