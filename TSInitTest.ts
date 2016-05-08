module test.TSInitTest{
    export interface ITBD{
        isNumberOdd?: (i : number) => boolean;
        numbers?: number[];
        clicked?: boolean;
        handleClick?: (e) => void;
        lastClicked?: number;
    }
}
