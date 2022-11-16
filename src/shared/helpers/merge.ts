import _merge from "lodash/merge";

export function merge<T, S>(t: T, s: S): T & S;
export function merge<T, S1, S2>(t: T, s1: S1, s2: S2): T & S1 & S2;
export function merge<T, S1, S2, S3>(
    t: T,
    s1: S1,
    s2: S2,
    s3: S3
): T & S1 & S2 & S3;
export function merge<T, S1, S2, S3, S4>(
    t: T,
    s1: S1,
    s2: S2,
    s3: S3,
    s4: S4
): T & S1 & S2 & S3 & S4;
export function merge(object: unknown, ...otherArgs: unknown[]): unknown;
export function merge(object: unknown, ...otherArgs: unknown[]): unknown {
    return _merge(object, ...otherArgs);
}