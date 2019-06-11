declare module 'bcp47-validate' {
    /**
     * @description: validate a locale
     * @example: validate("fr")
     */
    export function validate(locale: string): boolean;
}