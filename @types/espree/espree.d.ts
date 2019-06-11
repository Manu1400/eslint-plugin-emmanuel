declare namespace espree {
    interface Comment {
        value: string;
    }
    interface ParseOptions {
        comments: boolean;
    }
    interface Ast {
        comments: Comment[];
    }
}

declare module 'espree' {
    export function parse(code: string | Buffer, options?: Object): Object; // espree.Ast
}