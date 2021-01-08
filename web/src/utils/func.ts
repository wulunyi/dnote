import throttle from 'lodash/throttle';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function lock<T extends (...args: any) => void>(func: T) {
    let running = false;

    return async function (this: any, ...args: Parameters<T>) {
        if (running) {
            return;
        }

        running = true;

        try {
            await func.call(this, ...args);
        } finally {
            running = false;
        }
    };
}

export function concatParamsThrottle<T extends (param: any[]) => any>(
    func: T,
    ...args: ExcludeFirstIndex<Parameters<typeof throttle>>
) {
    const historyParams = [] as Parameters<T>[0];

    const debounceFunc = throttle(function (this: any): ReturnType<T> {
        return func.call(this, historyParams.splice(0, historyParams.length));
    }, ...args);

    return function (this: any, param: Parameters<T>[0]) {
        historyParams.push(...param);

        debounceFunc.call(this);
    };
}
