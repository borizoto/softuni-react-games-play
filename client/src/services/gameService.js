import { BASE_URL } from "../utils/utils";
import request from "../utils/requester";

export const getAll = async () => {
    const result = await request('GET', BASE_URL);
    const games = Object.values(result);
    
    return games;
};

export const create = (gameData) => request('POST', BASE_URL, gameData);
