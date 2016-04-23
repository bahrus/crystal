///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {
    //Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
    @component(crystal.jsXtaInitTagName)
    @template(`<span style="display: none">iah</span>`)
    class JSXtalInit extends polymer.Base {

        @property()
        innerTarget: string;

        attached() {
            const actions = evalInner(this);
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

    //function performActions(
    JSXtalInit.register();

    
    
}