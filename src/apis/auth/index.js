import { getRequest, postRequest } from '../axiosQuery';

export const register = async (payload) => {
    return await postRequest('/api/auth/signup', payload);
};

export const login = async (payload) => {
    return await postRequest('/api/auth/signin', payload);
};

export const getMe = async (payload) => {
    return await getRequest('/api/auth/me', payload);
};

// export const logout = async (refreshToken) => {
//     return await postRequest('/api/v1/auth/logout', { refreshToken });
// };
