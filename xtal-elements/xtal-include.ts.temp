///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {
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
        
        @property({
            type: Boolean
        })
        showUrl: boolean;

        @property({
            type:  Boolean
        })
        asyncOpt: boolean;

        @property({
            type: String
        })
        transformer: string;

        processTransformerTag(el: HTMLElement, importHTML: string, link) : string{
            if(!el) return importHTML;
            if(el.tagName === 'SCRIPT' && el.hasAttribute('xtal-include-transformer')){
                const transformerFn = eval(el.innerHTML);
                return transformerFn(importHTML, link, this);
            }
            return importHTML
        }
        onHrefChange(newVal: string, oldVal: string) {

            const link = this.importHref(this.href,
                () => { //success
                    this.async(() => {
                        this.style.display = 'inline-block';
                        while (this.childElementCount > 0) {
                            Polymer.dom(this).removeChild(this.firstChild);
                        }
                        const children = [];
                        if(this.showUrl){
                            const directURL = document.createElement("a");
                            directURL.setAttribute("href", this.href);
                            directURL.innerText = this.href;
                            children.push(directURL);
                        }
                        let importHTML = link.import.body.innerHTML;
                        const firstHeadElement = link.import.head.firstElementChild;
                        importHTML = this.processTransformerTag(firstHeadElement, importHTML, link);
                        if(this.transformer){
                            const transformerFn = eval(this.transformer);//TODO: safety check
                            importHTML = transformerFn(importHTML, link, this);
                        }
                        //const lastBodyElement = link.import.body.lastElementChild;
                        Polymer.dom(this).innerHTML = importHTML;
                    }, 1);
                },
                () => { //failure
                    console.log("error loading " + this.href);
                },
                this.asyncOpt
                //true
            );
        }
    }

    XtalInclude.register();
}