import { BASE_URL } from "../utils/utils";
import request from "../utils/requester";

export const getAll = async () => {
    const result = await request('GET', BASE_URL);
    const games = Object.values(result);
    
    return games;
};

export const getOne = (gameId) => request('GET', `${BASE_URL}/${gameId}`);

export const create = (gameData) => request('POST', BASE_URL, gameData);

export const deleteGame = (gameId) => request('DELETE', `${BASE_URL}/${gameId}`);