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
            const targetTemplate = <polymer.Base> nextNonScriptSibling(this);

            this.async(() => {
                let targets : NodeListOf<Element>;
                if(this.regionSelector){
                    targets = document.querySelectorAll(this.regionSelector);
                }else{
                    targets = <NodeListOf<Element>> <any> [ nextNonScriptSibling(this)];
                }
                for(let i = 0, ii = targets.length; i < ii; i++){
                    const target = targets[i];
                    for(let j = 0, jj = this.eventTypes.length; j < jj; j++){
                        const eventType = this.eventTypes[j];
                        const attribKey = `when-${eventType}-copy`;
                        const copies = target.querySelectorAll(`[${attribKey}]`);
                        for(let k = 0, kk = copies.length; k < kk; k++){
                            const copy = copies[k];
                            copy.addEventListener(eventType, (ev) =>{
                                const copyInfo = copy.getAttribute(attribKey);
                                //TODO:  traverse up parent tofind attribute
                                const tokens = copyInfo.split('-');
                                let valToSet;
                                switch(tokens[0]){
                                    case 'text':
                                        valToSet = target.textContent;
                                        break;
                                }
                                let path = tokens[2];
                                targetTemplate.set(path, valToSet)
                            })
                        }

                    }
                }

            }, 1);
        }
    }

    XtalSink.register();
}
