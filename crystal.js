/// <reference path="bower_components/polymer-ts/polymer-ts.d.ts" />
var xtal = (function () {
    function xtal() {
    }
    Object.defineProperty(xtal, "set", {
        get: function () { return null; },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    return xtal;
})();
var crystal;
(function (crystal) {
    //#region Polyfills
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    if (!String.prototype['startsWith']) {
        String.prototype['startsWith'] = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }
    ;
    var fnSignature = 'return ';
    var fnSignatureLn = fnSignature.length;
    function getMemberName(fnString) {
        var iPosReturn = fnString.indexOf(fnSignature);
        fnString = fnString.substr(iPosReturn + fnSignatureLn);
        var iPosSemi = fnString.indexOf(';');
        fnString = fnString.substr(0, iPosSemi);
        var iPosDot = fnString.indexOf('.');
        fnString = fnString.substr(iPosDot + 1);
        return fnString;
    }
    function getName(getter) {
        return getMemberName(getter.toString());
    }
    crystal.getName = getName;
    function metaBind(bindInfo) {
        return function metaBind(target, propertyKey, descriptor) {
            if (!descriptor) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            var originalMethod = descriptor.value;
            // NOTE: Do not use arrow syntax here. Use a function expression in
            // order to use the correct value of `this` in this method (see notes below)
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var result = originalMethod.apply(this, args); // run and store the result
                var htmlElement = this;
                var targetEls = htmlElement.querySelectorAll(bindInfo.elementSelector);
                for (var i = 0, n = targetEls.length; i < n; i++) {
                    var targetEl = targetEls[i];
                    targetEl.set(bindInfo.setPath, args[0]);
                }
                return result; // return the result of the original method
            };
            return descriptor;
        };
    }
    crystal.metaBind = metaBind;
    function performCustElActions(actions, target) {
        var polymerContext;
        for (var i = 0, ii = actions.length; i < ii; i++) {
            var action = actions[i];
            if (Array.isArray(action)) {
                performCustElActions(action, target);
                continue;
            }
            var doFn = action.do;
            if (doFn && typeof (doFn === 'function')) {
                var polymerAction = action;
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
            for (var key in action) {
                if (target.get && target.set) {
                    var currVal = target.get(key);
                    var newOrExtendedVal = action[key];
                    if (!currVal) {
                        target.set(key, newOrExtendedVal);
                    }
                    else {
                        //TODO:  untested condition
                        extend(currVal, newOrExtendedVal, true);
                        target.set(key, currVal);
                    }
                }
                else {
                    //data-bind template, e.g.
                    target[key] = action[key];
                }
            }
        }
    }
    crystal.performCustElActions = performCustElActions;
    function methodCallAction(action) {
        return function methodCallAction(target, propertyKey, descriptor) {
            if (!descriptor) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            var originalMethod = descriptor.value;
            var polymerContext = {
                element: target,
                action: action,
                methodName: propertyKey,
                methodDescriptor: descriptor
            };
            // NOTE: Do not use arrow syntax here. Use a function expression in
            // order to use the correct value of `this` in this method (see notes below)
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                polymerContext.args = args;
                if (action.before) {
                    polymerContext.isBeforeMethod = true;
                    action.do(polymerContext);
                }
                if (!action.skipMethodCall) {
                    var result = originalMethod.apply(this, args); // run and store the result
                }
                if (action.after) {
                    polymerContext.isBeforeMethod = false;
                    action.do(polymerContext);
                }
                return result; // return the result of the original method
            };
            return descriptor;
        };
    }
    crystal.methodCallAction = methodCallAction;
    //#endregion 
    //#region Merge Properties / Methods via html tag decorator #5 https://github.com/bahrus/crystal/issues/5
    // http://stackoverflow.com/questions/17242927/deep-merge-objects-with-angularjs
    function setHashKey(obj, h) {
        if (h) {
            obj.$$hashKey = h;
        }
        else {
            delete obj.$$hashKey;
        }
    }
    function extend(dest, obj, deep) {
        var h = dest.$$hashKey;
        //for (let i = 0, ii = src.length; i < ii; ++i) {
        //const obj = src[i];
        if ((typeof obj !== 'object') && (typeof obj !== 'function')) {
            return;
        }
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
            var key = keys[j];
            var src = obj[key];
            if (deep && (typeof src === 'object')) {
                if (src instanceof Date) {
                    dest[key] = new Date(src.valueOf());
                }
                else {
                    if (typeof dest[key] !== 'object')
                        dest[key] = Array.isArray(src) ? [] : {};
                    extend(dest[key], [src], true);
                }
            }
            else {
                dest[key] = src;
            }
        }
        //}
        setHashKey(dest, h);
        return dest;
    }
    crystal.extend = extend;
    //#endregion
    //#region custom element helpers
    function nextNonScriptSibling(el) {
        var nextElement = el.nextElementSibling;
        while (nextElement && nextElement.tagName === 'SCRIPT') {
            nextElement = nextElement.nextElementSibling;
        }
        return nextElement;
    }
    crystal.nextNonScriptSibling = nextNonScriptSibling;
    function evalInner(element) {
        var inner = element.innerText.trim();
        inner = inner.replace('xtal.set = ', '');
        if (!inner['startsWith']('[')) {
            inner = '[' + inner + ']';
        }
        var actions = eval(inner);
        return actions;
    }
    crystal.evalInner = evalInner;
})(crystal || (crystal = {}));
//# sourceMappingURL=crystal.js.map