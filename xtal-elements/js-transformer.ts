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
            },
            argument:{
                type: Object
            }
        },
        [onWatchChange]: function(newVal){
            let transformedObj = newVal;
            let arg = this.argument;
            if(!arg){
                arg = {};
            };
            arg.context = {
                element: this
            };
            for(let i  = 0, ii = this._transformerFns.length; i < ii; i++)
            {
                const transformerFn = this._transformerFns[i];
                transformedObj = transformerFn(transformedObj, arg);
                delete arg.context;
            }

            this['_setResult'](transformedObj);
        },
        attached: function(){
           this._transformerFns = eval(this.innerText);
        }
    });
}
