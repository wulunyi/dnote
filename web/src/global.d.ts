/* eslint-disable @typescript-eslint/no-explicit-any */
type ExcludeFirstIndex<T> = T extends [any, ...infer C] ? C : never;
