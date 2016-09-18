///<reference path='../bower_components/polymer/polymer.d.ts'/>
///<reference path='crystal.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        function serialize(form) {
            if (!form || form.nodeName !== "FORM") {
                return;
            }
            var i, j, q = [];
            for (i = form.elements.length - 1; i >= 0; i = i - 1) {
                if (form.elements[i].name === "") {
                    continue;
                }
                switch (form.elements[i].nodeName) {
                    case 'INPUT':
                        switch (form.elements[i].type) {
                            case 'text':
                            case 'hidden':
                            case 'password':
                            case 'button':
                            case 'reset':
                            case 'submit':
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                break;
                            case 'checkbox':
                            case 'radio':
                                if (form.elements[i].checked) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                }
                                break;
                            case 'file':
                                break;
                        }
                        break;
                    case 'TEXTAREA':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'SELECT':
                        switch (form.elements[i].type) {
                            case 'select-one':
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                break;
                            case 'select-multiple':
                                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                    if (form.elements[i].options[j].selected) {
                                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                    }
                                }
                                break;
                        }
                        break;
                    case 'BUTTON':
                        switch (form.elements[i].type) {
                            case 'reset':
                            case 'submit':
                            case 'button':
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                break;
                        }
                        break;
                }
            }
            return q.join("&");
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
                }
            },
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
                var childInputs = formElm.querySelectorAll('input');
                var _thisForm = this;
                for (var i = 0, ii = childInputs.length; i < ii; i++) {
                    var childInput = childInputs[i];
                    childInput['_value'] = childInput.value;
                    Object.defineProperty(childInput, "value", {
                        get: function () { return this._value; },
                        set: function (v) {
                            this._value = v;
                            if (!validateInputElement(this))
                                return;
                            var formData = serialize(formElm);
                            target['body'] = formData;
                            //if(_thisForm['auto'] && formElm.checkValidity()) {
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
                        }
                    });
                }
                if (_thisForm['auto'] && nativeAndCustomValidatorFn()) {
                    var formData = serialize(formElm);
                    target['body'] = formData;
                    target['generateRequest']();
                }
            }
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-form.js.map