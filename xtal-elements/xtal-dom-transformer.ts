module crystal.elements {
    //Put inner text of custom element into a property of element class #6 https://github.com/bahrus/crystal/issues/6
    @component('xtal-dom-transformer', 'script')
    class XtalDOMTransformer extends polymer.Base{
        
        attached(){
            const target = <polymer.Base>nextNonScriptSibling(this);
            const targetChildren = <HTMLElement[]> Polymer.dom(target)['getEffectiveChildNodes']();
            for(let i = 0, ii = targetChildren.length; i < ii; i++){
                const targetChild = targetChildren[i];
                if(targetChild.tagName === 'TEMPLATE'){
                    console.log(this.innerText);
                    const actions = evalInner(this);
                    for(let j = 0, jj = actions.length; j < jj; j++){
                        const action = actions[j];
                        action(targetChild, target);
                    }
                    break;
                }
            }
            
        }
    }
    
    
    XtalDOMTransformer.register();

}