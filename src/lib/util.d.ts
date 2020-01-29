/* tslint:disable */

export declare namespace ansiColor {
    interface IFn {
        (str: string): string;
    }
}
export declare const ansiColor: {
    black: ansiColor.IFn;
    red: ansiColor.IFn;
    green: ansiColor.IFn;
    yellow: ansiColor.IFn;
    blue: ansiColor.IFn;
    magenta: ansiColor.IFn;
    cyan: ansiColor.IFn;
    white: ansiColor.IFn;
    gray: ansiColor.IFn;
    grey: ansiColor.IFn;
    bgBlack: ansiColor.IFn;
    bgRed: ansiColor.IFn;
    bgGreen: ansiColor.IFn;
    bgYellow: ansiColor.IFn;
    bgBlue: ansiColor.IFn;
    bgMagenta: ansiColor.IFn;
    bgCyan: ansiColor.IFn;
    bgWhite: ansiColor.IFn;
    blackBright: ansiColor.IFn;
    redBright: ansiColor.IFn;
    greenBright: ansiColor.IFn;
    yellowBright: ansiColor.IFn;
    blueBright: ansiColor.IFn;
    magentaBright: ansiColor.IFn;
    cyanBright: ansiColor.IFn;
    whiteBright: ansiColor.IFn;
    bgBlackBright: ansiColor.IFn;
    bgRedBright: ansiColor.IFn;
    bgGreenBright: ansiColor.IFn;
    bgYellowBright: ansiColor.IFn;
    bgBlueBright: ansiColor.IFn;
    bgMagentaBright: ansiColor.IFn;
    bgCyanBright: ansiColor.IFn;
    bgWhiteBright: ansiColor.IFn;
}

export declare function idxOf(arr: any[], val: any, fromIdx?: number): number;

export declare function isUndef(val: any): boolean;

export declare function optimizeCb(fn: Function, ctx: any, argCount?: number): Function;

export declare namespace types {
    interface Collection<T> {}
    interface List<T> extends Collection<T> {
        [index: number]: T;
        length: number;
    }
    interface ListIterator<T, TResult> {
        (value: T, index: number, list: List<T>): TResult;
    }
    interface Dictionary<T> extends Collection<T> {
        [index: string]: T;
    }
    interface ObjectIterator<T, TResult> {
        (element: T, key: string, list: Dictionary<T>): TResult;
    }
    interface MemoIterator<T, TResult> {
        (prev: TResult, curr: T, index: number, list: List<T>): TResult;
    }
    interface MemoObjectIterator<T, TResult> {
        (prev: TResult, curr: T, key: string, list: Dictionary<T>): TResult;
    }
}
export declare const types: {}

export declare function escapeRegExp(str: string): string;

export declare function isObj(val: any): boolean;

export declare function has(obj: {}, key: string): boolean;

export declare function identity<T>(val: T): T;

export declare function repeat(str: string, n: number): string;

export declare function objToStr(val: any): string;

export declare function isArgs(val: any): boolean;

export declare function isFn(val: any): boolean;

export declare function getProto(obj: any): any;

export declare function isNum(val: any): boolean;

export declare function indent(str: string, char?: string, len?: number): string;

export declare function isArrLike(val: any): boolean;

export declare function isStr(val: any): boolean;

export declare function isArr(val: any): boolean;

export declare const isBrowser: boolean;

export declare const root: any;

export declare function detectMocha(): boolean;

export declare function keys(obj: any): string[];

export declare function each<T>(
    list: types.List<T>,
    iterator: types.ListIterator<T, void>,
    ctx?: any
): types.List<T>;
export declare function each<T>(
    object: types.Dictionary<T>,
    iterator: types.ObjectIterator<T, void>,
    ctx?: any
): types.Collection<T>;

export declare function createAssigner(keysFn: Function, defaults: boolean): Function;

export declare function values(obj: any): any[];

export declare function contain(
    arr: any[] | {} | string,
    val: any
): boolean;

export declare function extendOwn(destination: any, ...sources: any[]): any;

export declare function isEmpty(val: any): boolean;

export declare function isMatch(obj: any, src: any): boolean;

export declare function isPlainObj(val: any): boolean;

export declare function isUrl(val: string): boolean;

export declare function ltrim(str: string, chars?: string | string[]): string;

export declare function matcher(attrs: any): Function;

export declare function safeCb(val?: any, ctx?: any, argCount?: number): Function;

export declare function filter<T>(
    list: types.List<T>,
    iterator: types.ListIterator<T, boolean>,
    context?: any
): T[];
export declare function filter<T>(
    object: types.Dictionary<T>,
    iterator: types.ObjectIterator<T, boolean>,
    context?: any
): T[];

export declare function unique(
    arr: any[],
    cmp?: (a: any, b: any) => boolean | number
): any[];

export declare namespace allKeys {
    interface IOptions {
        prototype?: boolean;
        unenumerable?: boolean;
    }
}
export declare function allKeys(
    obj: any,
    options: { symbol: true } & allKeys.IOptions
): Array<string | Symbol>;
export declare function allKeys(
    obj: any,
    options?: ({ symbol: false } & allKeys.IOptions) | allKeys.IOptions
): string[];

export declare function defaults(obj: any, ...src: any[]): any;

export declare function extend(destination: any, ...sources: any[]): any;

export declare function map<T, TResult>(
    list: types.List<T>,
    iterator: types.ListIterator<T, TResult>,
    context?: any
): TResult[];
export declare function map<T, TResult>(
    object: types.Dictionary<T>,
    iterator: types.ObjectIterator<T, TResult>,
    context?: any
): TResult[];

export declare function min(...num: number[]): number;

export declare function noop(): void;

export declare function now(): number;

export declare function toStr(val: any): string;

export declare function rpad(str: string, len: number, chars?: string): string;

export declare function rtrim(str: string, chars?: string | string[]): string;

export declare function trim(str: string, chars?: string | string[]): string;

export declare function extractBlockCmts(str: string): string[];

export declare function some<T>(
    list: types.List<T>,
    iterator?: types.ListIterator<T, boolean>,
    context?: any
): boolean;
export declare function some<T>(
    object: types.Dictionary<T>,
    iterator?: types.ObjectIterator<T, boolean>,
    context?: any
): boolean;

export declare function startWith(str: string, prefix: string): boolean;

export declare function stripCmt(str: string): string;

export declare function stripColor(str: string): string;

export declare function toArr(val: any): any[];

export declare function stripIndent(str: string): string;
export declare function stripIndent(
    literals: TemplateStringsArray,
    ...placeholders: any[]
): string;

export declare function topoSort(edges: any[]): any[];

