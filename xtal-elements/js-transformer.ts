///<reference path='../bower_components/polymer/polymer.d.ts'/>

module crystal.elements{
    const onWatchChange = 'onWatchChange';

    Polymer({
        is: 'js-transformer',
        _transformerFns: null,
        properties:{
            watch:{
                type: Object,
                observer: onWatchChange
            },
            result:{
                type: Object,
                notify: true,
                readOnly: true
            }
        },
        [onWatchChange]: function(newVal){
            let transformedObj = newVal;
            for(let i  = 0, ii = this._transformerFns.length; i < ii; i++)
            {
                const transformerFn = this._transformerFns[i];
                transformedObj = transformerFn(transformedObj);
            }
            this['_setResult'](transformedObj);
        },
        attached: function(){
           this._transformerFns = eval(this.innerText);
        }
    });
}
