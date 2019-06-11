type Int = number & { __int__: void };

declare namespace Reflect {

    //interface quantifier {
    //    str: "*" | "+" | "?";
    //}

    interface Character {
        value: number; // an integer UTF-16 code unit
    }

    interface CharacterClass {
        type: 'CharacterClass';
        negated: boolean;
        ranges: {
            start: Character;
            end: Character;
        };
    }

    interface MinMax {
        min: Int; // minimum number of repetitions
        max: Int; // maximum number of repetitions
    }

    interface Term {
        type: 'Term';
        atom: Character | CharacterClass | Disjunction;
        quantifier: null | MinMax;
    }

    interface Alternative {
        type: 'Alternative';
        terms: Term[];
    }

    interface Disjunction {
        type: 'Disjunction';
        alternatives: Alternative[];
    }
}

declare module 'reflect-type-3' {
    export function parse(code: string): Reflect.Disjunction;
}