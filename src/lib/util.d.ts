export declare function escapeRegExp(str: string): string

export declare function has(obj: {}, key: string): boolean

export declare function indent(str: string, char?: string, len?: number): string

export declare function isFn(val: any): boolean

export declare function each(
    obj: {} | any[],
    iteratee: (val: any, key?: string | number, obj?: {} | any[]) => void,
    ctx?: any
): void

export declare function defaults(obj: {}, ...src: any[]): {}

export declare function contain(arr: any[], val: any): boolean

export declare function isStr(val: any): boolean

export declare function isEmpty(val: any): boolean

export declare function isUrl(val: string): boolean

export declare function filter(
    obj: {} | any[],
    predicate: (val: any, idx?: number | string, obj?: {} | any[]) => boolean,
    ctx?: any
): any[]

export declare function map(
    obj: {} | any[],
    iteratee: (val: any, idx?: number | string, obj?: {} | any[]) => boolean,
    ctx?: any
): any[]

export declare function noop(): void

export declare function now(): number

export declare function rpad(str: string, len: number, chars?: string): string

export declare function trim(str: string, chars?: string | string[]): string

export declare function extractBlockCmts(str: string): string[]

export declare function startWith(str: string, prefix: string): boolean

export declare function stripCmt(str: string): string

export declare function stripColor(str: string): string

export declare function toArr(val: any): any[]

export declare function topoSort(edges: any[]): any[]

export declare function unique(
    arr: any[],
    compare?: (a: any, b: any) => boolean | number
): any[]

