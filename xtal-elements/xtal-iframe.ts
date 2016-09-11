///<reference path='../bower_components/polymer/polymer.d.ts'/>

module crystal.elements {
    Polymer({
        is: 'xtal-iframe',
        ready: function() {
            this.async(() => {
                const targetChildren = this.getEffectiveChildren();
                const htmlToEmbed = document.importNode(targetChildren[0], true);
                const iframe = this.$$("iframe");
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
}
