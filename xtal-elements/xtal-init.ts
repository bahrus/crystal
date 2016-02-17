﻿///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {
    //Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
    @component('xtal-init', 'script')
    class XtalInit extends polymer.Base {

        @property()
        innerTarget: string;

        attached() {
            const actions = evalInner(this);
            let target = nextNonScriptSibling(this);
            if(target && target.set){
                console.log('found target');
                console.log(target['outerHTML']);
                this.processTarget(target, actions);
            }else{
                this.async(() => {
                    target = nextDomBindElement(this);
                    debugger;
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
    XtalInit.register();

    
    
}