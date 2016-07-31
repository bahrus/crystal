/**
 * Created by Bruce on 4/17/2016.
 */

function map(strings, ...values){

}

const myArray : string[] = ['hello', 'world'];

const myHTML = `
    <ul>
                                ${[myArray.map, ]`
        <li>${s}</li>
                                `}.join('')}
    </ul>
`;

interface IMapper<TInputItem, TOutputItem>{
    from: TInputItem[];
    select?: (inp: TInputItem) => TOutputItem;

}

const mapper: IMapper<string[], string[]> = {
    from: myArray,
};

const myHTML2 = `
    <ul>
                                ${
                                mapper.select = s =>`
        <li>${s}</li>
                                `;

                                }
    </ul>
`;