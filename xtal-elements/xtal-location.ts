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