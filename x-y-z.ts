const onPropChange = 'onPropChangeString';
Polymer({
    is: 'x-y-z',
    properties:{
        prop:{
            type: String,
            observer: onPropChange,
        }
    },
    [onPropChange] : function(newVal){
        console.log(newVal);
    }
    
})