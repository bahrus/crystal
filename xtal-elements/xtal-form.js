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
                var target = elements.nextNonScriptSibling(this);
                if (target.nodeName != 'IRON-AJAX') {
                    throw 'form must precede iron-ajax element';
                }
                var formElm = this.children[0];
                var childInputs = formElm.querySelectorAll('input');
                for (var i = 0, ii = childInputs.length; i < ii; i++) {
                    var childInput = childInputs[i];
                    childInput['_value'] = childInput.value;
                    Object.defineProperty(childInput, "value", {
                        get: function () { return this._value; },
                        set: function (v) {
                            this._value = v;
                            var formData = serialize(formElm);
                            debugger;
                            target['body'] = formData;
                            target['generateRequest']();
                        }
                    });
                }
                // const observer = new MutationObserver(function(mutations) {
                //     mutations.forEach(function(mutation) {
                //         console.log(mutation.type);
                //     });
                // });
                // const config = { attributes: true, childList: true, characterData: true, subtree: true };
                // // pass in the target node, as well as the observer options
                // const childNodes = this.children;
                // for(const childNode of childNodes){
                //     observer.observe(this, config);
                // }
            },
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-form.js.map