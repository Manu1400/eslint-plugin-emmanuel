interface step {
    predicates: Array<any>,
}

interface obj {
    steps: Array<step>,
}

declare module 'js-xpath' {
    export function parse(xpathExpression: string): obj;
    export function toXPath(xpathExpression: any): string;

    export function setXPathModels(): any;
    export function makeXPathModels(): any;
}