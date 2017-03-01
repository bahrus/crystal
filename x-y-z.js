var onPropChange = 'onPropChangeString';
Polymer((_a = {
        is: 'x-y-z',
        properties: {
            prop: {
                type: String,
                observer: onPropChange,
            }
        }
    },
    _a[onPropChange] = function (newVal) {
        console.log(newVal);
    },
    _a));
var _a;
//# sourceMappingURL=x-y-z.js.map