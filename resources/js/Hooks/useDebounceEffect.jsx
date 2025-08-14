import { useEffect } from "react";

export function useDebounceEffect(fn, waitTime, deps) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fn.apply(undefined, deps);
        }, waitTime);

        return () => {
            clearTimeout(timeoutId);
        };
    }, deps);
}
