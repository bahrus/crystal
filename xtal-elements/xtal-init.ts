module crystal.elements {
    //Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
    @component('xtal-init', 'script')
    class XtalInit extends polymer.Base {

        @property()
        innerTarget: string;

        attached(){
            const actions = evalInner(this);
            let target = <polymer.Base>nextNonScriptSibling(this);
            if (this.innerTarget) {
                target = <polymer.Base> target.querySelector(this.innerTarget);
            }
            for(let i = 0, ii = actions.length; i < ii; i++){
                const action = actions[i];
                for (const key in action) {
                    if (target.get && target.set) {
                        const currVal = target.get(key);
                        const newOrExtendedVal = action[key];
                        if (!currVal) {
                            target.set(key, newOrExtendedVal);
                        } else {
                            //TODO:  untested condition
                            extend(currVal, newOrExtendedVal, true);
                            target.set(key, currVal);
                        }
                    } else {
                        target[key] = action[key];
                    }
                }
            }
        }
    }
    XtalInit.register();

    
    
}