import request from "../utils/requester";

const loginUrl = 'http://localhost:3030/users';

export const useLogin = () => {
    const login = async (email, password) => {
        const result = await request('POST', `${loginUrl}/login`, { email, password });

        return result;
    }

    return { login };
}