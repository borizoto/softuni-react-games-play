import request from "../utils/requester";

const usersUrl = 'http://localhost:3030/users';

export const useLogin = () => {
    const login = async (email, password) => {
        const result = await request('POST', `${usersUrl}/login`, { email, password });

        return result;
    }

    return { login };
}

export const useRegister = () => {
    const register = async (email, password) => {
        const result = await request('POST', `${usersUrl}/register`, {email, password});

        return result;
    }

    return { register };
}