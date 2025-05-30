class Str  {

    static snake(str) {
        return str.replace(/([A-Z])/g, '_$1')
            .replace(/^_/, '')
            .toLowerCase();
    }
    /**
     * @function trim
     * @description Trims a string by the right and by the left
     * @param {String} str
     * @return {String} Trimmed string
     * @example
     * trim(' This is a tesT ')
     * // This is a tesT
     * @example
     * str(' This is a tesT ').trim().value
     * // This is a tesT
     */
    static trim = (str: string): string => str
        .replace(/^\s+/, '')
        .replace(/\s+$/, '');

    /**
     * @function capitalize
     * @description Capitalizes a string after applying a trim to it
     * @param {String} str
     * @return {String}
     * @example
     * capitalize('test')
     * // Test
     * @example
     * str('TEST').capitalize()
     * // Test
     */
    static capitalize = (str: string) => {
        str = this.trim(str);
        return String(str.charAt(0).toUpperCase()) + String(str.slice(1).toLowerCase());
    };

    /**
     * @function camelcase
     * @description Returns a string in camelcase after trimming it
     * @param {String} string
     * @return {String} The camelcase string
     * @example
     * camelcase(' This is a tesT ')
     * // thisIsATest
     * @example
     * str(' This is a tesT ').camelcase().value
     * // thisIsATest
     */
    static camel = (string: string): string => this.trim(string)
        .replace(/[_-]/g, ' ')
        .toLowerCase()
        .split(' ')
        .reduce((acc, word, i) => acc + (i === 0 ? word : this.capitalize(word)), '');

    /**
     * @function pascal
     * @description Returns a string in camelcase after trimming it
     * @param {String} string
     * @return {String} The pascal case string
     * @example
     * camelcase(' This is a tesT ')
     * // thisIsATest
     * @example
     * str(' This is a tesT ').camelcase().value
     * // thisIsATest
     */
    static pascal = (string: string): string => {
        var camelString = this.camel(string);
        var firstChar = camelString.charAt(0);
        return firstChar.toUpperCase() + camelString.slice(1);
    }

    /**
     * @function slugify
     * @description Slugifies a string
     * @param {String} str
     * @param sep
     * @return {String} Slugified string
     * @example
     * slugify(' This is a tesT ')
     * // this-is-a-test
     * @example
     * slugify(' This is a tesT ', ':')
     * // this:is:a:test
     * @example
     * str(' This is a tesT ').slugify().value
     * // this-is-a-test
     */
    static slugify = (str: string, sep = '-'): string => this.trim(str)
        .toLowerCase()
        .replace(/ /g, sep) // Cambio espacios por el separador
        .normalize('NFD') // Quito todas las tildes
        .replace(/[\u0300-\u036f]/g, '');

    /**
     * @function count
     * @description Counts characters in a string
     * @param {String} str
     * @return {Number} Number of characters
     * @example
     * count('test')
     * // 4
     * @example
     * str('test').length
     * // 4
     * @example
     * str('test').count()
     * // 4
     */
    static count = (str: any) => String(str).length;

    /**
     * @function endsWith
     * @description Checks if a string ends with the provided substring
     * @param {String} str
     * @param sub
     * @param {Number} [pos=0] Position to start checking. Defaults to 0
     * @return {Boolean} True / False
     * @example
     * endsWith('test', 'st')
     * // true
     * @example
     * str('test').endsWith('st')
     * // true
     */
    static endsWith = (str: string, sub, pos: number): boolean => {
        str = String(str);
        if (!pos || !isFinite(pos) || Math.floor(pos) !== pos || pos > str.length) {
            pos = str.length;
        }
        pos -= sub.length;
        const index = str.indexOf(sub, (pos - 1));
        return index !== -1 && index === pos;
    };

    /**
     * @function startsWith
     * @description Checks if a string starts with the provided substring
     * @param {String} str
     * @param sub
     * @param {Number} [pos=0] Position to start checking. Defaults to 0
     * @return {Boolean} True / False
     * @example
     * startsWith('test', 'te')
     * // true
     * @example
     * str('test').startsWith('te')
     * // true
     */
    static startsWith = (str: string, sub, pos: number): boolean => String(str).indexOf(sub, pos || 0) === (pos || 0);

    /**
     * @function lower
     * @description Transform str to lower case
     * @param {String} str
     * @return {String} Lower cased string
     * @example
     * lower('TEST')
     * // test
     * @example
     * str('TEST').lower().value
     * // test
     */
    static lower = (str: string): string => str.toLowerCase();

    /**
     * @function upper
     * @description Transform a string to uppercase
     * @param {String} str
     * @return {String} Uppercased string
     * @example
     * upper('test')
     * // TEST
     * @example
     * str('test').upper().value
     * // TEST
     */
     static upper = str => String(str).toUpperCase();
}

export default Str;
