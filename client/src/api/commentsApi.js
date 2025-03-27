import { useEffect, useState } from "react"
import request from "../utils/requester";
import { useAuthRequest } from "../hooks/useAuthRequest";

const commentsUrl = 'http://localhost:3030/data/comments'

export const useComments = (gameId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`
        })
        request('GET', `${commentsUrl}?${searchParams.toString()}`)
            .then(setComments)
    }, [])

    return { comments, setComments }
}

export const useCreateComment = () => {
    const { authRequest } = useAuthRequest();

    const create = (commentData, gameId, email) => authRequest('POST', commentsUrl, { comment: commentData, gameId, email });

    return { create }
}