///<reference path='../bower_components/polymer/polymer.d.ts'/>
var crystal;
(function (crystal) {
    var elements;
    (function (elements) {
        var onWatchChange = 'onWatchChange';
        Polymer((_a = {
                is: 'js-transformer',
                _transformerFns: null,
                properties: {
                    watch: {
                        type: Object,
                        observer: onWatchChange
                    },
                    result: {
                        type: Object,
                        notify: true,
                        readOnly: true
                    },
                    argument: {
                        type: Object
                    }
                }
            },
            _a[onWatchChange] = function (newVal) {
                var transformedObj = newVal;
                var arg = this.argument;
                if (!arg) {
                    arg = {};
                }
                ;
                arg.context = {
                    element: this
                };
                var detail = { obj: transformedObj, arg: arg };
                this.fire('transform', detail);
                transformedObj = detail.obj;
                for (var i = 0, ii = this._transformerFns.length; i < ii; i++) {
                    var transformerFn = this._transformerFns[i];
                    if (typeof (transformerFn) !== 'function') {
                        console.error("Cannot resolve function specified in position " + i + " from " + this.innerText);
                    }
                    transformedObj = transformerFn(transformedObj, arg);
                    delete arg.context;
                }
                this['_setResult'](transformedObj);
            },
            _a.attached = function () {
                this._transformerFns = eval(this.innerText);
            },
            _a
        ));
        var _a;
    })(elements = crystal.elements || (crystal.elements = {}));
})(crystal || (crystal = {}));
//# sourceMappingURL=js-transformer.js.map