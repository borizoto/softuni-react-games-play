import { useState } from "react"

export const usePersistedState = (stateKey, initialState) => {

    const [state, setState] = useState(() => {
        const persistedStateJson = sessionStorage.getItem(stateKey);

        if (!persistedStateJson) {
            return typeof (initialState) === 'function' ? initialState() : initialState;
        }

        const persistedState = JSON.parse(persistedStateJson);

        return persistedState;
    });

    const setPersistedState = (input) => {
        const data = typeof (input) === 'function' ? input(state) : input;

        const persistedData = JSON.stringify(data);

        sessionStorage.setItem(stateKey, persistedData);

        setState(data);
    }

    return [
        state,
        setPersistedState
    ]
}