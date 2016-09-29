///<reference path='../bower_components/polymer/polymer.d.ts'/>
///<reference path='crystal.ts'/>

module crystal.elements{
    function serialize(form: HTMLFormElement, asObject?: boolean) : string | {[key: string] : string | string[]} {
        if (!form || form.nodeName !== "FORM") {
            return;
        }
        //var i, j, q = [];
        let q : string[];
        let p : {[key: string] : string | string[]};
        if(asObject){
            p = {};
        }else{
            q = [];
        }
        for (let i = form.elements.length - 1; i >= 0; i = i - 1) {
            const elm = form.elements[i] as HTMLInputElement;
            if (elm.name === "") {
                continue;
            }
            let val: string;
            if(q){
                val = encodeURIComponent(elm.value);
            }else{
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
                            if(q){
                                q.push(elm.name + "=" + val);
                            }else{
                                p[elm.name] = val;
                            }

                            break;
                        case 'checkbox':
                        case 'radio':
                            if (elm.checked) {
                                if(q){
                                    q.push(elm.name + "=" + val);
                                }else{
                                    if(p[elm.name]){
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
                    if(q){
                        q.push(elm.name + "=" + val);
                    }else{
                        p[elm.name] = val;
                    }
                    break;
                case 'SELECT':
                    switch (elm.type) {
                        case 'select-one':
                            if(q){
                                q.push(elm.name + "=" + val);
                            }else{
                                p[elm.name] = val;
                            }
                            break;
                        case 'select-multiple':
                            const selm = <HTMLSelectElement><any>elm;
                            const options = selm.options;
                            for (let j = options.length - 1; j >= 0; j = j - 1) {
                                if (options[j]['selected']) {
                                    let val2: string;
                                    if(q){
                                        val2 =  encodeURIComponent(options[j]['value']);
                                    }else{
                                        val2 = options[j]['value'];
                                    }
                                    if(q){
                                        q.push(elm.name + "=" + val);
                                    }else{
                                        if(!p[elm.name]){
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
                            if(q){
                                q.push(elm.name + "=" + val);
                            }else{
                                if(!p[elm.name]){
                                    p[elm.name] = [];
                                }
                                p[elm.name]['push'](val);
                            }
                            break;
                    }
                    break;
            }
        }
        if(q){
            return q.join("&");
        }else{
            return p;
        }

    }
    function validateInputElement(inputEl: HTMLInputElement){
        const val = inputEl.value;
        if(inputEl.required && val.length === 0) return false;
        if(inputEl.maxLength != -1 && val.length > inputEl.maxLength) return false;
        if(inputEl.pattern){
            const regExp = new RegExp(inputEl.pattern);
            if(! regExp.test(val)) return false;
        }
        //TODO:  set class?
        return true;
    }
    const xtalForm = Polymer({
        is: 'xtal-form',
        properties:{
            auto:{
                type: Boolean
            },
            ironAjaxSelector:{
                type: String,
            },
            cacheAll:{
                type: Boolean
            }
        },
        listeners:{
            'tap': 'handleTap'
        },
        _cachedResponses: {},
        attached: function() {
            const target = this.$$('iron-ajax');
            const validator = this.$$('js-validator');
            let  customValidatorFns;
            if(validator){
                customValidatorFns = eval(validator.innerText);
            }
            const formElm = this.$$('form') as HTMLFormElement; //this.children[0] as HTMLFormElement;
            const nativeAndCustomValidatorFn = () =>{
                //const hidden = formElm.hidden;
                const inputs = formElm.querySelectorAll('input');
                const formData = {};
                for(let i = 0, ii = inputs.length; i < ii; i++){
                    const inpu = inputs[i] as HTMLInputElement;
                    if(!validateInputElement(inpu)) return false;
                    formData[inpu.name] = inpu.value;
                }
                if(customValidatorFns){
                    for(const customValidatorFn of customValidatorFns){
                        if(!customValidatorFn(formData)) return false;
                    }
                }
                return true;
            };
            const _thisForm = this as polymer.Base;
            if(this.cacheAll){
                target.addEventListener('response', e => {
                    const cacheKey = JSON.stringify(target['body']);
                    _thisForm['_cachedResponses'][ cacheKey ] = target.lastResponse;
                });
            }
            const submit = () =>{
                const formData = serialize(formElm, true);
                if(_thisForm['cacheAll']){
                    const reqString = JSON.stringify(formData);
                    const previousVal = _thisForm['_cachedResponses'][reqString];
                    if(previousVal){
                        target._setLastResponse(previousVal);
                        return;
                    }
                }
                target['body'] = formData;
                if(_thisForm['auto'] && nativeAndCustomValidatorFn()) {
                    const debounceDuration = target['debounceDuration'];
                    if(debounceDuration){
                        _thisForm.debounce('generateRequest', () =>{
                            target['generateRequest']();
                        }, debounceDuration);
                    }else{
                        target['generateRequest']();
                    }

                }
            };
            const childInputs = formElm.querySelectorAll('input');

            for(let i = 0, ii = childInputs.length; i < ii; i++){
                const childInput = childInputs[i] as HTMLInputElement;

                childInput['_value'] = childInput.value;

                Object.defineProperty(childInput, "value", {
                    get: function() {return this._value;},
                    set: function(v) {
                        this._value = v;
                        if(!validateInputElement(this as HTMLInputElement)) return;
                        submit();
                        //if(_thisForm['auto'] && formElm.checkValidity()) {


                    }
                });
            }
            submit();



        },
        handleTap: function(e: Event){
            if(e.srcElement['type'] === 'submit'){
                //TODO:  add validation
                const target = this.$$('iron-ajax');
                target['generateRequest']();
            }
            //if(e.srcElement.get)
        }

    });

}
