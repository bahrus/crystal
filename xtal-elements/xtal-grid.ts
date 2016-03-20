///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>
///<reference path="../crystal.ts"/>

module crystal.elements{
    @template(
    `
    <iron-list items="[[data]]" as="item" style="overflow:auto; height:200px">
        <template>
            <div>
                <span>{{item.col0}}</span>
                <span>{{item.col1}}</span>
                <span>{{item.col2}}</span>
                <!--<span>{{item.col3}}</span>-->
                <!--<span>{{item.col4}}</span>-->
                <!--<span>{{item.col5}}</span>-->
                <!--<span>{{item.col6}}</span>-->
                <!--<span>{{item.col7}}</span>-->
                <!--<span>{{item.col8}}</span>-->
                <!--<span>{{item.col9}}</span>-->
                <!--<span>{{item.col10}}</span>-->
                <!--<span>{{item.col11}}</span>-->
                <!--<span>{{item.col12}}</span>-->
                <!--<span>{{item.col13}}</span>-->
                <!--<span>{{item.col14}}</span>-->
                <!--<span>{{item.col15}}</span>-->
                <!--<span>{{item.col16}}</span>-->
                <!--<span>{{item.col17}}</span>-->
                <!--<span>{{item.col18}}</span>-->
                <!--<span>{{item.col19}}</span>-->

            </div>
        </template>
     </iron-list>
    `
    )
    @component('xtal-grid')
    class XtalGrid extends polymer.Base{
        data = window['data'];
    }
    XtalGrid.register();
}
