﻿module crystal.elements {
    //Add client side include element #3 https://github.com/bahrus/crystal/issues/3
    //region abbreviations
    //#region abbreviations
    function rn(getter: crystal.IGetter<XtalInclude>) {
        return crystal.getName<XtalInclude>(getter);
    }
    const c = {
        'href': rn(o => o.href),
        'onHrefChange': rn(o => o.onHrefChange),
    };
    //#endregion
    //endregion

    @component('xtal-include', 'link')
    class XtalInclude extends polymer.Base {
        @property({
            observer: c.onHrefChange
        })
        href: string;

        onHrefChange(newVal: string, oldVal: string) {
            const link = this.importHref(this.href,
                () => { //success
                    this.async(() => {
                        this.style.display = 'inline-block';
                        while (this.childElementCount > 0) {
                            Polymer.dom(this).removeChild(this.firstChild);
                        }
                        const children = [];
                        let child = link.import.body.firstChild;
                        while (child) {
                            children.push(child);
                            //Polymer.dom(this).appendChild(child);
                            child = child.nextElementSibling;
                        }
                        for (let i = 0, n = children.length; i < n; i++) {
                            child = children[i];
                            Polymer.dom(this).appendChild(child);
                        }
                    }, 1);
                },
                () => { //failure
                    console.log("error loading " + this.href);
                }
            );
        }
    }

    XtalInclude.register();
}