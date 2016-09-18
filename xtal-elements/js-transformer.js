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
                    }
                }
            },
            _a[onWatchChange] = function (newVal) {
                var transformedObj = newVal;
                for (var i = 0, ii = this._transformerFns.length; i < ii; i++) {
                    var transformerFn = this._transformerFns[i];
                    transformedObj = transformerFn(transformedObj);
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