module crystal.elements {
    //Be able to specify a DOM serializer for inner content of custom element. #6 https://github.com/bahrus/crystal/issues/6
    @component('xtal-dom-transformer', 'script')
    class XtalDOMTransformer extends polymer.Base{
        
        attached(){
            const target = <polymer.Base>nextNonScriptSibling(this);
            this.async(() => {
                const targetChildren = <HTMLElement[]>Polymer.dom(target)['getEffectiveChildNodes']();
                const actions = evalInner(this);
                for (let j = 0, jj = actions.length; j < jj; j++) {
                    const action = actions[j];
                    action(targetChildren, target);

                }
            }, 1);            
        }
    }
    
    
    XtalDOMTransformer.register();

}