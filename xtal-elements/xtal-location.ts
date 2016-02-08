///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements {

    @component('xtal-location')
    class XtalLocation<TValues> extends polymer.Base  {
        @property()
        lhsMarker = 'xtal=';
        @property()
        rhsMarker = '/*=xtal*/';

        
        @property({
            type: Object
        })
        values : TValues;

        beginTransaction() {
        }

        endTransaction() {
        }

        @observe('values.*')
        onValueChange(changeRecord) {
            debugger;
        }

        attached() {
            debugger;
        }



    }
    XtalLocation.register();
}