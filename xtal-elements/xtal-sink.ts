///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements{
    @component('xtal-sink')
    class XtalSink  extends polymer.Base{
        @property()
        regionSelector: string;

        @property()
        eventTypes =['click'];

        attached(){


            this.async(() => {
                let targets : NodeListOf<Element>;
                if(this.regionSelector){
                    targets = document.querySelectorAll(this.regionSelector);
                }else{
                    targets = <NodeListOf<Element>> <any> [ nextNonScriptSibling(this)];
                }
                

            }, 1);
        }
    }

    XtalSink.register();
}
