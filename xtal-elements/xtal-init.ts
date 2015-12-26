module crystal.elements {
    //Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
    @component('xtal-init', 'script')
    class XtalInit extends polymer.Base {
        attached(){
            const inner  = this.innerText;
            const actions = <any[]> eval(inner);
            const target = <polymer.Base> nextNonScriptSibling(this);
            for(let i = 0, ii = actions.length; i < ii; i++){
                const action = actions[i];
                for(const key in action){
                    target.set(key, action[key]);
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

    
}