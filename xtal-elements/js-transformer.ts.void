///<reference path='../bower_components/polymer/polymer.d.ts'/>

module crystal.elements{
    const onWatchChange = 'onWatchChange';
    export interface ITransformEventDetail{
        obj: Object;
        arg: IArgumentContext;
    };
    export interface IArgumentContext{
        context?: IContext;
    };
    export interface IContext{
        element: HTMLElement;
        count: number;
    }
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
            let arg : IArgumentContext = this.argument;
            if(!arg){
                arg = {};
            };
            arg.context = {
                element: this,
                count: 0,
            };
            const detail : ITransformEventDetail = {obj: transformedObj, arg: arg};
            this.fire('transform', detail);
            arg.context.count++;
            transformedObj = detail.obj;
            if(this._transformerFns ){
                for(let i  = 0, ii = this._transformerFns.length; i < ii; i++)
                {
                    const transformerFn = this._transformerFns[i];
                    if(typeof(transformerFn) !== 'function'){
                        console.error("Cannot resolve function specified in position " + i + " from " + this.innerText);
                    }
                    transformedObj = transformerFn(transformedObj, arg);
                    arg.context.count++;

                }
            }


            detail.obj = transformedObj;
            this.fire('transform', detail);
            delete arg.context;
            this['_setResult'](transformedObj);

        },
        attached: function(){
            try{
                this._transformerFns = eval(this.innerText);
            }catch(e){
                console.error("Unable to parse " + this.innerText);
            }
            if(!Array.isArray(this._transformerFns)) delete this._transformerFns;
        }
    });
}
