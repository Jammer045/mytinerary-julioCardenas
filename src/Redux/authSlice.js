import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        },
        loginFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.user = null;
            state.token = null;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
        }
    }
});

export const { startLoading, loginSuccess, loginFail, logoutSuccess } = authSlice.actions;

// Nos traemos la logica del login del backend
export const userLogin = (credentials) => async (dispatch) => {
    try {
        dispatch(startLoading());
        
        const response = await axios.post('http://localhost:8080/api/auth/signin', credentials);
        
        if (response.data.success) {
            const { token, user } = response.data.response;
            localStorage.setItem('token', token);
            dispatch(loginSuccess({ token, user }));
            return true;
        } else {
            dispatch(loginFail(response.data.message));
            return false;
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred during login";
        dispatch(loginFail(errorMessage));
        return false;
    }
};

// Nos traemos la logica del logout del backend
export const userLogout = () => async (dispatch, getState) => {
    try {
        const token = getState().auth.token;
        await axios.post('http://localhost:8080/api/auth/signout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(logoutSuccess());
        return true;
    } catch (error) {
        console.error("Logout error:", error);
        dispatch(logoutSuccess());
        return false;
    }
};

export default authSlice.reducer;