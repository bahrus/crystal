///<reference path='../bower_components/polymer/polymer.d.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        Polymer({
            is: 'xtal-iframe',
            ready: function () {
                var _this = this;
                this.async(function () {
                    var targetChildren = _this.getEffectiveChildren();
                    var htmlToEmbed = document.importNode(targetChildren[0], true);
                    var iframe = _this.$$("iframe");
                    iframe.contentWindow.document.open();
                    iframe.contentWindow.document.write(htmlToEmbed['innerHTML']);
                    iframe.contentWindow.document.close();
                    // for (let j = 0, jj = actions.length; j < jj; j++) {
                    //     const action = actions[j];
                    //     action(targetChildren, target);
                    //
                    // }
                }, 1);
            }
        });
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=xtal-iframe.js.map