import { useContext, useEffect } from "react";
import request from "../utils/requester";
import { UserContext } from "../contexts/UserContext";

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
        const result = await request('POST', `${usersUrl}/register`, { email, password });

        return result;
    }

    return { register };
}

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext)

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        request('GET', `${usersUrl}/logout`, null, accessToken)
            .then(userLogoutHandler);

    }, [accessToken, userLogoutHandler])

    sessionStorage.removeItem('auth')

    return { isLoggedOut: !!accessToken };
}