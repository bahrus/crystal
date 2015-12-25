/// <reference path="bower_components/polymer-ts/polymer-ts.d.ts" />

module crystal {

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
        action: IPolymerAction;
        methodName: string;
        methodDescriptor: TypedPropertyDescriptor<any>;
        isBeforeMethod?: boolean;
        args?: any[];
    }

    export interface IPolymerAction {
        do?: (context: IPolymerActionContext) => void;
        before?: boolean;
        after?: boolean;
        skipMethodCall?: boolean;

    }

    export function methodCallAction(action: IPolymerAction) {
        return function methodCallAction(target: polymer.Element, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
            if (!descriptor) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            const originalMethod = descriptor.value;

            const polymerContext: IPolymerActionContext = {
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
}