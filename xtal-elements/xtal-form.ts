///<reference path='../bower_components/polymer/polymer.d.ts'/>
///<reference path='crystal.ts'/>

module crystal.elements{
    const xtalForm = Polymer({
        is: 'xtal-form',
        extends: 'form',
        properties:{
            auto:{
                type: Boolean
            },
            ironAjaxSelector:{
                type: String,
            }
        },
        attached: function() {
            let target = nextNonScriptSibling(this);
            // if(target.nodeName != 'iron-ajax'){
            //     throw 'form must precede iron-ajax element';
            // }
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    console.log(mutation.type);
                });
            });
            const config = { attributes: true, childList: true, characterData: true };
            // pass in the target node, as well as the observer options
            debugger;
            observer.observe(this, config);
        },
    });

}
