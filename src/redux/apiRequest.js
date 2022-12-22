import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutUser,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import { getUserFailed, getUsersStart, getUsersSuccess } from './userSlice';

const URL = 'http://localhost:8080';

// dispatch: gọi actions từ Slice
export const login = async (user, dispatch, navigate, setSySErrorMessage) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${URL}/api/auth/signin`, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed());
        setSySErrorMessage(true);
    }
};

export const register = async (
    user,
    dispatch,
    setSuccess,
    setSySErrorMessage,
) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${URL}/api/auth/signup`, user);
        dispatch(registerSuccess(res.data));
        setSuccess(true);
    } catch (err) {
        dispatch(registerFailed());
        setSySErrorMessage(err.response.data.message);
    }
};

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(`${URL}/api/auth/all`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailed());
    }
};

export const logout = async (user, dispatch) => {
    dispatch(logoutUser(user));
};
