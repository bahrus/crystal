module crystal.elements {
    // Allow a DOM element inside light dom to set value in custom element #8 https://github.com/bahrus/crystal/issues/8

    @component('xtal-set', 'script')
    class XtalSet extends polymer.Base {
        @property()
        innerTarget: string;

        attached() {
            const actions = evalInner(this);
            let target = <HTMLElement>nextNonScriptSibling(this);
            if (this.innerTarget) {
                target = <HTMLElement>target.querySelector(this.innerTarget);
            }
            performLightDOMActions(actions, target);
        }
    }

    function performLightDOMActions(actions: any[], target: HTMLElement) {
        let domActionContext: ILightDOMElemenActionContext;
        for (let i = 0, ii = actions.length; i < ii; i++) {
            const action = actions[i];
            if (Array.isArray(action)) {
                performLightDOMActions(action, target);
                continue
                ;
            }
            const doFn = action.do;
            if (doFn && typeof (doFn === 'function')) {
                const domElementAction = <LightDOMElementAction>action;
                if (!domActionContext) {
                    domActionContext = {
                        element: target,
                    };
                }
                domActionContext.action = action;
                doFn(domActionContext);
                continue;
            }
            //#region add attributes / event handlers to dom element
            for (const key in action) {
                if (key.indexOf('on') === 0) {

                } else {
                    Polymer.dom(target).setAttribute(key, action[key]);
                }
            }
            //#endregion
        }
    }
}