import { useEffect, useState } from "react";

import { useAuthRequest } from "../hooks/useAuthRequest";
import { BASE_URL } from "../utils/utils";
import request from "../utils/requester";

export const useGames = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        request('GET', BASE_URL)
            .then(setGames)
            .catch(err => {
                console.error('Error fetching games:', err.message);
                setError(err.message || "Failed to load games. Please try again later");
            })
    }, [])

    return { games, error }
};

export const useGame = (gameId) => {
    const [game, setGame] = useState({});

    useEffect(() => {
        request('GET', `${BASE_URL}/${gameId}`)
            .then(setGame)
    }, [gameId])

    return { game };
}

export const useLatestGames = () => {
    const [latestGames, setLatestGames] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 5
        });

        request('GET', `${BASE_URL}?${searchParams.toString()}`)
            .then(setLatestGames);
    }, [])

    return { latestGames };
}

export const useCreateGame = () => {
    const { authRequest } = useAuthRequest();

    const create = (gameData) => {
        return authRequest('POST', BASE_URL, gameData);
    };

    return { create };
}

export const useDeleteGame = () => {
    const { authRequest } = useAuthRequest();

    const deleteGame = (gameId) => {
        return authRequest('DELETE', `${BASE_URL}/${gameId}`, null)
    }

    return { deleteGame };
}

export const useEditGame = () => {
    const { authRequest } = useAuthRequest();

    const editGame = (gameId, gameData) => {
        return authRequest('PUT', `${BASE_URL}/${gameId}`, gameData);
    }

    return { editGame };
}