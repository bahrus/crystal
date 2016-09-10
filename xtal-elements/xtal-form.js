///<reference path='../bower_components/polymer/polymer.d.ts'/>
///<reference path='crystal.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        var xtalForm = Polymer({
            is: 'xtal-form',
            extends: 'form',
            properties: {
                auto: {
                    type: Boolean
                },
                ironAjaxSelector: {
                    type: String
                }
            },
            attached: function () {
                var target = elements.nextNonScriptSibling(this);
                // if(target.nodeName != 'iron-ajax'){
                //     throw 'form must precede iron-ajax element';
                // }
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        console.log(mutation.type);
                    });
                });
                var config = { attributes: true, childList: true, characterData: true, subtree: true };
                // pass in the target node, as well as the observer options
                var childNodes = this.children;
                for (var _i = 0, childNodes_1 = childNodes; _i < childNodes_1.length; _i++) {
                    var childNode = childNodes_1[_i];
                    observer.observe(this, config);
                }
            }
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-form.js.map