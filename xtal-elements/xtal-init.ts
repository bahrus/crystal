module crystal.elements {
    //Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
    @component('xtal-init', 'script')
    class XtalInit extends polymer.Base {
        attached(){
            const actions = evalInner(this);
            const target = <polymer.Base> nextNonScriptSibling(this);
            for(let i = 0, ii = actions.length; i < ii; i++){
                const action = actions[i];
                for(const key in action){
                    const currVal = target.get(key);
                    const newOrExtendedVal = action[key];
                    if(!currVal){
                        target.set(key, newOrExtendedVal);
                    }else{
                        //TODO:  untested condition
                        extend(currVal, newOrExtendedVal, true); 
                        target.set(key, currVal);
                    }
                }
            }
        }
    }
    XtalInit.register();

    export function nextNonScriptSibling(el:HTMLElement):Element {
        let nextElement = el.nextElementSibling;
        while (nextElement && nextElement.tagName === 'SCRIPT') {
            nextElement = nextElement.nextElementSibling;
        }
        return nextElement;
    }

    export function evalInner(element: polymer.Base){
        let inner  = element.innerText.trim();
        if(!inner['startsWith']('[')){
            inner = '[' + inner + ']';
        }
        const actions = <any[]> eval(inner);
        return actions;
    }
    
}