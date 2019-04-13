declare module 'reflect-type-3' {
    export function parse(str: string): {
        type: string;
        alternatives: {
            type: string;
            terms: any[];
        }[];
    }
}