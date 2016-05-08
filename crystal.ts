/// <reference path="bower_components/polymer-ts/polymer-ts.d.ts" />
// class xtal{
//     public static get set() { return null;}
//     public static set set(val: any){}
// }

module crystal {

    //import multiSplit = crystal.util.multiSplit;
    export const labelTagName = 'xtal-label';
    export const jsXtaInitTagName = 'js-xtal-init';
    export const tsXtalInitTagName = 'ts-xtal-init';

    //#region Polyfills
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    if (!String.prototype['startsWith']) {
        String.prototype['startsWith'] = function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }
    //endregion

    //#region Add Name Resolver #1 https://github.com/bahrus/crystal/issues/1
    export interface IGetter<T> {
        (obj: T): any;
    };

    export interface IPolymerContext {
        element: polymer.Base;
    }


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
        internalOnly?: boolean;
        targetsMayAppearLater?: boolean;
        setPath: string;
    }

    export interface ISetObjectInfo {
        path?: string;
        val?: any;
    }

    


    export const cachedObjects: { [key: string] : ISetObjectInfo } = { };

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
                let elementSelector = bindInfo.elementSelector;
                const valToSet = args[0];
                if (bindInfo.targetsMayAppearLater) {
                    cachedObjects[elementSelector] = {
                        path: bindInfo.setPath,
                        val: valToSet,
                    };
                    elementSelector = `.${labelTagName}-${bindInfo.elementSelector}`;
                }
                let targetEls: NodeListOf<Element>;
                if (bindInfo.internalOnly) {
                    targetEls = htmlElement.querySelectorAll(elementSelector);
                } else {
                    targetEls = document.querySelectorAll(elementSelector);
                }
                for (let i = 0, ii = targetEls.length; i < ii; i++) {
                    let targetEl = <polymer.Base>targetEls[i];
                    targetEl.set(bindInfo.setPath, valToSet);
                }
                return result;                                               // return the result of the original method
            };

            return descriptor;
        }
    }
    //#endregion

    //export type InitializationObject = Object | InitializationObject[];


    //#region Be able to add declarative actions to method #4 https://github.com/bahrus/crystal/issues/4
    export interface IPolymerActionContext {
        element: polymer.Element;
        action?: IPolymerAction;
    }

    export interface ILightDOMElementActionContext {
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
        do?: (context: ILightDOMElementActionContext) => void;
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
                continue;
            }
            if(action.debug) {
                debugger;
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
                    console.log('key', key);
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
        let tagName = nextElement.tagName;
        while (nextElement){
            //let bKeepGoing = false
            switch(tagName){
                case 'SCRIPT':
                case jsXtaInitTagName:
                    //bKeepGoing = true;
                    break;
                default:
                    return nextElement;
            }

            nextElement = nextElement.nextElementSibling;
            tagName = nextElement.tagName;
        }
        return nextElement;
    }

    export function nextDomBindElement(el: HTMLElement) : Element {
        let nextElement = el.nextElementSibling;
        while (nextElement) {
            const isAttr = nextElement.getAttribute('is');
            if(isAttr && (isAttr == 'dom-bind')){
                break;
            }
            nextElement = nextElement.nextElementSibling;
        }
        return nextElement;
    }

    export function evalInner(element: polymer.Base, isTS?: boolean){
        let inner = Polymer.dom(element)['getEffectiveChildNodes']()[0].nodeValue;
        if(isTS){
            inner = util.stripTypings(inner);
        }
        const actionGetter = eval(inner);
        let actions : any;
        if(typeof actionGetter === 'function'){
            const context: IPolymerContext = {
                element: element,
            };
            actions = actionGetter(context);
        }else{
            actions = actionGetter;
        }

        if(!Array.isArray(actions)) actions = [actions];
        return actions;
    }
    
    

    export function readStringConstant(element: polymer.Base) {
        return element.innerText.trim();
    }


    //#endregion

    //#region Actions
    export interface ITransferDataAction extends IMetaBindInfo, IPolymerAction {}
    export interface ICoordinateDataBetweenElementsAction extends IPolymerAction {
        watchPath?: string;
        transferDataActions?: ITransferDataAction[];

    }
    

    export function CoordinateDataBetweenElementsActionImpl(context: IPolymerActionContext) {
        let coordinator = <ICoordinateDataBetweenElementsAction>context.action;
        window.addEventListener('WebComponentsReady', e => {
            // any code that depends on polymer here
            const he = <HTMLElement>context.element;
            const act = <ICoordinateDataBetweenElementsAction> context.action;
            const watchPath = Polymer['CaseMap'].camelToDashCase(act.watchPath);
            he.addEventListener(watchPath + '-changed', e => {
                debugger;
            });
        });
    }
    //#endregion
    export module util{


        export function stripTypings(text: string){
            //const tokenArray = multiSplit(text, [';', ','])
            const tokenArray = text.split(' ');
            for(let i = 0, ii = tokenArray.length; i < ii; i++){
                const token = tokenArray[i];
                switch(token){
                    case 'const':
                        if(i + 2 < ii){
                            const nextToken = tokenArray[i + 1];
                            if(nextToken.indexOf(':') > -1){
                                tokenArray[i + 1] = nextToken.replace(':', '');
                                tokenArray[i + 2] = ''
                            }

                        }
                        continue;
                }

            }
            const text2 = tokenArray.join(' ');
            const tokenArray2 = splitPairs(text2, {lhs: '(', rhs: ')'});
            for(let i = 0, ii = tokenArray2.length; i < ii; i++){
                const token = tokenArray2[i];
                if(token === '(' && i + 2 < ii){
                    if(tokenArray2[i + 2] != ')'){
                        throw "Invalid expression"
                    }
                    const args = tokenArray2[i + 1].split(',');
                    const newArgs = args.map(s => substringBefore(s, ';'));
                    tokenArray2[i + 1] = newArgs.join(',');

                }
            }
            return tokenArray2.join('');

        }

        export interface IPair{
            lhs: string;
            rhs: string;
        }

        function splitPairs(text: string, pair: IPair): string[]{
            const returnObj: string[] = [];
            let region: string[] = [];
            for(let i = 0, ii = text.length; i < ii; i++){
                const chr = text[i];
                switch(chr){
                    case pair.rhs:
                    case pair.lhs:
                        returnObj.push(region.join(''));
                        returnObj.push(chr);
                        region = [];
                        break;
                    //case pair.rhs
                    default:
                        region.push(chr);
                }

            }
            if(region.length > 0){
                returnObj.push(region.join(''));
            }
            return returnObj;
        }

        export function substringBefore(value: string, search: string){
            const iPos = value.indexOf(search);
            if(iPos < -1) return value;
            return value.substr(0, iPos);
        }
    }
}