/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../crystal.ts"/>

module TestElements {

    @component('ron-weasley')
    @template(`
        <div>Ron is dating {{girlfriend}}</span>
        <div>Ron knows Ginny is dating {{ginnyBoyfriend}}</div>
    `)
    class RonWeasley extends polymer.Base {
        @property({
            notify: true
        })
        girlfriend = "Lavandar Brown";
    }
    RonWeasley.register();

    @component('ginny-weasley')
    @template(`
        <div>Ginny is dating {{boyfriend}}</div>
    `)
    class GinnyWeasley extends polymer.Base {
        @property({
            notify: true
        })
        boyfriend = "Dean Thomas";
    }
    GinnyWeasley.register();

    @component('harry-potter')
    @template(`
        <table>
            <tr>
                <td>Owl Message: </td>
                <td>
                    <input type='text' value="{{owlMessage::input}}"/>
                </td>
            </tr>
            <tr>
                <td>Floo Message: </td>
                <td><input type='text' value="{{flooMessage::input}}"/></td>
            </tr>
        </table>
    `)
    class HarryPotter extends polymer.Base {
        @property({
            observer: 'onNewOwlMessage',
            notify: true,
            
        })
        owlMessage = 'Scar is hurting';
        @crystal.metaBind({
            elementSelector: 'siriusMessanger',
            setPath: 'messageFromHarry',
            targetsMayAppearLater: true,
        })
        onNewOwlMessage(newVal: string, oldVal: string) { }

        @property({
            notify: true,
        })
        flooMessage = 'test';
            
    }
    HarryPotter.register();

    @component('sirius-black')
    @template(`
        <span>Message received from Harry: {{messageFromHarry}}</span>
    `)
    class SiriusBlack extends polymer.Base {
        @property()
        messageFromHarry;
    }
    SiriusBlack.register();

    export const sendFlooMessage: crystal.ICoordinateDataBetweenElementsAction = {
        do: crystal.CoordinateDataBetweenElementsActionImpl,
        watchPath: 'flooMessage',
        transferDataActions: [
        ]
    }

}