///<reference path='../bower_components/polymer/polymer.d.ts'/>
///<reference path='crystal.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        function serialize(form, asObject) {
            if (!form || form.nodeName !== "FORM") {
                return;
            }
            //var i, j, q = [];
            var q;
            var p;
            if (asObject) {
                p = {};
            }
            else {
                q = [];
            }
            for (var i = form.elements.length - 1; i >= 0; i = i - 1) {
                var elm = form.elements[i];
                if (elm.name === "") {
                    continue;
                }
                var val = void 0;
                if (q) {
                    val = encodeURIComponent(elm.value);
                }
                else {
                    val = elm.value;
                }
                switch (elm.nodeName) {
                    case 'INPUT':
                        switch (elm.type) {
                            case 'text':
                            case 'hidden':
                            case 'password':
                            case 'button':
                            case 'reset':
                            case 'submit':
                                if (q) {
                                    q.push(elm.name + "=" + val);
                                }
                                else {
                                    p[elm.name] = val;
                                }
                                break;
                            case 'checkbox':
                            case 'radio':
                                if (elm.checked) {
                                    if (q) {
                                        q.push(elm.name + "=" + val);
                                    }
                                    else {
                                        if (p[elm.name]) {
                                            p[elm.name] = [];
                                        }
                                        p[elm.name]['push'](val);
                                    }
                                }
                                break;
                            case 'file':
                                break;
                        }
                        break;
                    case 'TEXTAREA':
                        if (q) {
                            q.push(elm.name + "=" + val);
                        }
                        else {
                            p[elm.name] = val;
                        }
                        break;
                    case 'SELECT':
                        switch (elm.type) {
                            case 'select-one':
                                if (q) {
                                    q.push(elm.name + "=" + val);
                                }
                                else {
                                    p[elm.name] = val;
                                }
                                break;
                            case 'select-multiple':
                                var selm = elm;
                                var options = selm.options;
                                for (var j = options.length - 1; j >= 0; j = j - 1) {
                                    if (options[j]['selected']) {
                                        var val2 = void 0;
                                        if (q) {
                                            val2 = encodeURIComponent(options[j]['value']);
                                        }
                                        else {
                                            val2 = options[j]['value'];
                                        }
                                        if (q) {
                                            q.push(elm.name + "=" + val);
                                        }
                                        else {
                                            if (!p[elm.name]) {
                                                p[elm.name] = [];
                                            }
                                            p[elm.name]['push'](val);
                                        }
                                    }
                                }
                                break;
                        }
                        break;
                    case 'BUTTON':
                        switch (elm.type) {
                            case 'reset':
                            case 'submit':
                            case 'button':
                                if (q) {
                                    q.push(elm.name + "=" + val);
                                }
                                else {
                                    if (!p[elm.name]) {
                                        p[elm.name] = [];
                                    }
                                    p[elm.name]['push'](val);
                                }
                                break;
                        }
                        break;
                }
            }
            if (q) {
                return q.join("&");
            }
            else {
                return p;
            }
        }
        function validateInputElement(inputEl) {
            var val = inputEl.value;
            if (inputEl.required && val.length === 0)
                return false;
            if (inputEl.maxLength != -1 && val.length > inputEl.maxLength)
                return false;
            if (inputEl.pattern) {
                var regExp = new RegExp(inputEl.pattern);
                if (!regExp.test(val))
                    return false;
            }
            //TODO:  set class?
            return true;
        }
        var xtalForm = Polymer({
            is: 'xtal-form',
            properties: {
                auto: {
                    type: Boolean
                },
                ironAjaxSelector: {
                    type: String,
                },
                cacheAll: {
                    type: Boolean
                }
            },
            listeners: {
                'tap': 'handleTap'
            },
            _cachedResponses: {},
            attached: function () {
                var target = this.$$('iron-ajax');
                var validator = this.$$('js-validator');
                var customValidatorFns;
                if (validator) {
                    customValidatorFns = eval(validator.innerText);
                }
                var formElm = this.$$('form'); //this.children[0] as HTMLFormElement;
                var nativeAndCustomValidatorFn = function () {
                    //const hidden = formElm.hidden;
                    var inputs = formElm.querySelectorAll('input');
                    var formData = {};
                    for (var i = 0, ii = inputs.length; i < ii; i++) {
                        var inpu = inputs[i];
                        if (!validateInputElement(inpu))
                            return false;
                        formData[inpu.name] = inpu.value;
                    }
                    if (customValidatorFns) {
                        for (var _i = 0, customValidatorFns_1 = customValidatorFns; _i < customValidatorFns_1.length; _i++) {
                            var customValidatorFn = customValidatorFns_1[_i];
                            if (!customValidatorFn(formData))
                                return false;
                        }
                    }
                    return true;
                };
                var _thisForm = this;
                if (this.cacheAll) {
                    target.addEventListener('response', function (e) {
                        var cacheKey = JSON.stringify(target['body']);
                        _thisForm['_cachedResponses'][cacheKey] = target.lastResponse;
                    });
                }
                var submit = function () {
                    var formData = serialize(formElm, true);
                    if (_thisForm['cacheAll']) {
                        var reqString = JSON.stringify(formData);
                        var previousVal = _thisForm['_cachedResponses'][reqString];
                        if (previousVal) {
                            target._setLastResponse(previousVal);
                            return;
                        }
                    }
                    target['body'] = formData;
                    if (_thisForm['auto'] && nativeAndCustomValidatorFn()) {
                        var debounceDuration = target['debounceDuration'];
                        if (debounceDuration) {
                            _thisForm.debounce('generateRequest', function () {
                                target['generateRequest']();
                            }, debounceDuration);
                        }
                        else {
                            target['generateRequest']();
                        }
                    }
                };
                var childInputs = formElm.querySelectorAll('input');
                for (var i = 0, ii = childInputs.length; i < ii; i++) {
                    var childInput = childInputs[i];
                    childInput['_value'] = childInput.value;
                    Object.defineProperty(childInput, "value", {
                        get: function () { return this._value; },
                        set: function (v) {
                            this._value = v;
                            if (!validateInputElement(this))
                                return;
                            submit();
                            //if(_thisForm['auto'] && formElm.checkValidity()) {
                        }
                    });
                }
                submit();
            },
            handleTap: function (e) {
                var srcElement = e.srcElement;
                var isSubmit = (srcElement.type === 'submit') || (srcElement.getAttribute('type') === 'submit');
                if (isSubmit) {
                    //TODO:  add validation
                    var target = this.$$('iron-ajax');
                    target['generateRequest']();
                }
                //if(e.srcElement.get)
            }
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-form.js.map