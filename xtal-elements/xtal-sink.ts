///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements{
    @component('xtal-sink')
    class XtalSink  extends polymer.Base{
        @property()
        regionSelector: string;

        @property()
        eventHandlerList: string[] =['click'];

        attached(){
            let targets : NodeListOf<Element>;
            if(this.regionSelector){
                targets = document.querySelectorAll(this.regionSelector);
            }else{
                targets = <NodeListOf<Element>> <any> [ nextNonScriptSibling(this)];
            }

            this.async(() => {
                for(let i = 0, ii = targets.length; i < ii; i++){
                    const target = <HTMLElement> targets[i];
                    const targetChildren = <HTMLElement[]>Polymer.dom(target)['getEffectiveChildNodes']();
                }

            }, 1);
        }
    }

    XtalSink.register();
}
