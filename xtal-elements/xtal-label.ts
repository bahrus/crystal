///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {
    
    @component(crystal.labelTagName, 'script')
    class XtalLabel extends polymer.Base {
        attached() {
            const label = readStringConstant(this);
            const label2 = `${crystal.labelTagName}-${label}`;
            const target = <polymer.Base>nextNonScriptSibling(this);
            this.toggleClass(label2, true, target);
            const cachedObj = crystal.cachedObjects[label];
            if (cachedObj) {
                target.set(cachedObj.path, cachedObj.val);
            }
        }
    } 

    XtalLabel.register();
}