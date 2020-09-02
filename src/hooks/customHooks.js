import { useEffect } from 'react'

export function useKeyboard(event, callback, dependencies) {    //  6   custom hook dependencies
    useEffect(() => {
        window.addEventListener(event, callback);
        return () => {
            window.removeEventListener(event, callback);
        }
    }, [dependencies, event, callback]);
}