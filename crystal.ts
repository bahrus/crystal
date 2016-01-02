/// <reference path="bower_components/polymer-ts/polymer-ts.d.ts" />
class xtal{
    public static get set() { return null;}
    public static set set(val: any){}
}

module crystal {
    //#region Polyfills
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    if (!String.prototype['startsWith']) {
        String.prototype['startsWith'] = function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }
    //#endregion

    //#region Add Name Resolver #1 https://github.com/bahrus/crystal/issues/1
    export interface IGetter<T> {
        (obj: T): any;
    };

    const fnSignature = 'return ';


    const fnSignatureLn = fnSignature.length;

    function getMemberName(fnString: string): string {
        const iPosReturn = fnString.indexOf(fnSignature);
        fnString = fnString.substr(iPosReturn + fnSignatureLn);
        const iPosSemi = fnString.indexOf(';');
        fnString = fnString.substr(0, iPosSemi);
        const iPosDot = fnString.indexOf('.');
        fnString = fnString.substr(iPosDot + 1);
        return fnString;
    }



    export function getName<T>(getter: IGetter<T>) {
        return getMemberName(getter.toString());
    }
    //#endregion

    //#region Support MetaBinding #2 https://github.com/bahrus/crystal/issues/2
    export interface IMetaBindInfo {
        elementSelector: string;
        setPath: string;
    }

    export function metaBind(bindInfo?: IMetaBindInfo) {
        return function metaBind(target: polymer.Element, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
            if (!descriptor) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            const originalMethod = descriptor.value;

            // NOTE: Do not use arrow syntax here. Use a function expression in
            // order to use the correct value of `this` in this method (see notes below)
            descriptor.value = function (...args: any[]) {
                var result = originalMethod.apply(this, args);               // run and store the result
                const htmlElement = <HTMLElement>this;
                const targetEls = htmlElement.querySelectorAll(bindInfo.elementSelector);
                for (let i = 0, n = targetEls.length; i < n; i++) {
                    let targetEl = <polymer.Base>targetEls[i];
                    targetEl.set(bindInfo.setPath, args[0])
                }
                return result;                                               // return the result of the original method
            };

            return descriptor;
        }
    }
    //#endregion

    //#region Be able to add declarative actions to method #4 https://github.com/bahrus/crystal/issues/4
    export interface IPolymerActionContext {
        element: polymer.Element;
        action?: IPolymerAction;
    }

    export interface ILightDOMElemenActionContext {
        element: HTMLElement;
        action?: LightDOMElementAction;
    }

    export interface IPolymerMethodDecoratorActionContext extends IPolymerActionContext {
        action: IPolymerMethodDecoratorAction;
        methodName: string;
        methodDescriptor: TypedPropertyDescriptor<any>;
        isBeforeMethod?: boolean;
        args?: any[];
    }

    export interface IPolymerAction {
        do?: (context: IPolymerActionContext) => void;
    }

    export interface LightDOMElementAction{
        do?: (context: ILightDOMElemenActionContext) => void;
    }

    export interface IPolymerMethodDecoratorAction extends IPolymerAction {
        
        before?: boolean;
        after?: boolean;
        skipMethodCall?: boolean;

    }

    export function performCustElActions(actions: any[], target: polymer.Base) {
        let polymerContext: IPolymerActionContext;
        for (let i = 0, ii = actions.length; i < ii; i++) {
            const action = actions[i];
            if (Array.isArray(action)) {
                performCustElActions(action, target);
                continue
                ;
            }
            const doFn = action.do;
            if (doFn && typeof (doFn === 'function')) {
                const polymerAction = <IPolymerAction>action;
                if (!polymerContext) {
                    polymerContext = {
                        element: target,
                    };
                }
                polymerContext.action = action;
                doFn(polymerContext);
                continue;
            }
            //#region merge object into custom element
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
                    //data-bind template, e.g.
                    target[key] = action[key];
                }
            }
            //#endregion
        }
    }

    export function methodCallAction(action: IPolymerMethodDecoratorAction) {
        return function methodCallAction(target: polymer.Element, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
            if (!descriptor) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            const originalMethod = descriptor.value;

            const polymerContext: IPolymerMethodDecoratorActionContext = {
                element: target,
                action: action,
                methodName: propertyKey,
                methodDescriptor: descriptor
            };
            // NOTE: Do not use arrow syntax here. Use a function expression in
            // order to use the correct value of `this` in this method (see notes below)
            descriptor.value = function (...args: any[]) {
                polymerContext.args = args;
                if (action.before) {
                    polymerContext.isBeforeMethod = true;
                    action.do(polymerContext);
                }
                if (!action.skipMethodCall) {
                    var result = originalMethod.apply(this, args);  // run and store the result
                }
                if (action.after) {
                    polymerContext.isBeforeMethod = false;
                    action.do(polymerContext);
                }
                return result;                                               // return the result of the original method
            };

            return descriptor;
        }
    }
    //#endregion 

    //#region Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
    // http://stackoverflow.com/questions/17242927/deep-merge-objects-with-angularjs
    
    
    function setHashKey(obj, h) {
        if (h) {
            obj.$$hashKey = h;
        } else {
            delete obj.$$hashKey;
        }
    }

    export function extend(dest, obj, deep: boolean) {
        const h = dest.$$hashKey;

        //for (let i = 0, ii = src.length; i < ii; ++i) {
            //const obj = src[i];
            if ((typeof obj !== 'object') && (typeof obj !== 'function')){
                 return;
            }
            const keys = Object.keys(obj);
            for (let j = 0, jj = keys.length; j < jj; j++) {
                const key = keys[j];
                const src = obj[key];

                if (deep && (typeof src === 'object')) {
                    if (src instanceof Date) {
                        dest[key] = new Date(src.valueOf());
                    } else {
                        if (typeof dest[key] !== 'object') dest[key] = Array.isArray(src) ? [] : {};
                        extend(dest[key], [src], true);
                    }
                } else {
                    dest[key] = src;
                }
            }
        //}

        setHashKey(dest, h);
        return dest;
    }

    

    //#endregion

    //#region custom element helpers
    export function nextNonScriptSibling(el:HTMLElement):Element {
        let nextElement = el.nextElementSibling;
        while (nextElement && nextElement.tagName === 'SCRIPT') {
            nextElement = nextElement.nextElementSibling;
        }
        return nextElement;
    }

    export function evalInner(element: polymer.Base){
        let inner  = element.innerText.trim();
        inner = inner.replace('xtal.set = ', '');
        if(!inner['startsWith']('[')){
            inner = '[' + inner + ']';
        }
        const actions = <any[]> eval(inner);
        return actions;
    }
    //#endregion

}