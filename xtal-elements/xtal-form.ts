///<reference path='../bower_components/polymer/polymer.d.ts'/>
///<reference path='crystal.ts'/>

module crystal.elements{
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
    function validateInputElement(inputEl: HTMLInputElement){
        if(inputEl.required && inputEl.value.length === 0) return false;
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
            }
        },
        attached: function() {
            //let target = nextNonScriptSibling(this);
            // if(target.nodeName != 'IRON-AJAX'){
            //     throw 'form must precede iron-ajax element';
            // }
            const target = this.$$('iron-ajax');
            const validator = this.$$('js-validator');
            let  customValidatorFns;
            if(validator){
                customValidatorFns = eval(validator.innerText);
            }
            const formElm = this.$$('form') as HTMLFormElement; //this.children[0] as HTMLFormElement;
            const nativeAndCustomValidatorFn = () =>{
                const inputs = formElm.querySelectorAll('input');
                const formData = {};
                for(let i = 0, ii = inputs.length; i < ii; i++){
                    const inpu = inputs[i] as HTMLInputElement;
                    if(!validateInputElement(inpu)) return false;
                    formData[inpu.name] = inpu.value;
                }
                if(customValidatorFns){
                    for(const customValidatorFn of customValidatorFns){
                        console.log(customValidatorFn.toString());
                        if(!customValidatorFn(formData)) return false;
                    }
                }
                return true;
            }
            const childInputs = formElm.querySelectorAll('input');
            const _thisForm = this as polymer.Base;
            for(let i = 0, ii = childInputs.length; i < ii; i++){
                const childInput = childInputs[i] as HTMLInputElement;

                childInput['_value'] = childInput.value;

                Object.defineProperty(childInput, "value", {
                    get: function() {return this._value;},
                    set: function(v) {
                        this._value = v;
                        if(!validateInputElement(this as HTMLInputElement)) return;
                        const formData = serialize(formElm);

                        target['body'] = formData;
                        //if(_thisForm['auto'] && formElm.checkValidity()) {
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

                    }
                });
            }

           if(_thisForm['auto'] && nativeAndCustomValidatorFn()){
               const formData = serialize(formElm);
               target['body'] = formData;
               target['generateRequest']();
           }


        },

        // ready: function(){
        //     this.async(() => {
        //         //const validatorElm = this.$$('template[role="validator"]') as HTMLTemplateElement;
        //         //const validatorElm = this.$$('template') as HTMLTemplateElement;
        //         const validatorElm = this.getEffectiveChildren()[0];
        //         if(validatorElm){
        //             const content = document.importNode(validatorElm, true);
        //             const inner = content['innerHTML'];
        //             debugger;
        //             //const validatorFn = eval(content);
        //         }
        //     }, 1)
        //
        // }
    });

}
