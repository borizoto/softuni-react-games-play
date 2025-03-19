import request from "../utils/requester";

const BASE_URL = 'http://localhost:3030/jsonstore/comments';

export const getAll = async (gameId) => {
    const result = await request('GET', BASE_URL);

    const comments = Object.values(result).filter(comment => comment.gameId === gameId);
    
    return comments;
};

export const getOne = (gameId) => request('GET', `${BASE_URL}/${gameId}`);

export const create = (commentData, gameId, email) => request('POST', BASE_URL, {comment: commentData, gameId, email});

export const deleteGame = (gameId) => request('DELETE', `${BASE_URL}/${gameId}`);

export const edit = (gameId, gameData) => request('PUT', `${BASE_URL}/${gameId}`, gameData);