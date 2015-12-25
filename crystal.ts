/// <reference path="bower_components/polymer-ts/polymer-ts.d.ts" />

module crystal {

    //#region Add Name Resolver #1 https://github.com/bahrus/crystal/issues/1
    export interface IGetter<T> {
        (obj: T): any;
    };

    const fnSignature = 'return ';


    const fnSignatureLn = fnSignature.length;

    function getMemberName(fnString: string): string {
        const iPosReturn = fnString.indexOf(fnSignature);
        fnString = fnString.substr(iPosReturn + fnSignatureLn);
        const iPosSemi = fnString.indexOf(';');
        fnString = fnString.substr(0, iPosSemi);
        const iPosDot = fnString.indexOf('.');
        fnString = fnString.substr(iPosDot + 1);
        return fnString;
    }

    export function getName<T>(getter: IGetter<T>) {
        return getMemberName(getter.toString());
    }
    //#endregion

    //#region Support MetaBinding #2 https://github.com/bahrus/crystal/issues/2
    //#endregion
}