import axios from "axios";
import { User } from "../models/User";

const apiUrl = 'https://gretljestslaby.pythonanywhere.com/';
const localStorageKey = 'token';
const httpClient = axios.create();

httpClient.interceptors.request.use(async config => {
    const token = await getToken();
    config.headers = {
        'Accept': 'application/json',
    }
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

httpClient.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (error.response.status === 401) {
        await logout()
        // refresh the page for them
        window.location.assign(window.location)
    }
    return error;
})

const login = async (email, password) => {
    let response = await httpClient.post(`${apiUrl}users/auth/login/`, {
        username: email,
        password: password,
    });
    console.log(`Status code:` + response.status);
    if (response.status === 200) {
        window.localStorage.setItem(localStorageKey, response.data['key'])
    }
    return response;
}


const getCurrentUser = async () => {
    let response = await httpClient.get(`${apiUrl}users/auth/user/`)
    return new User(response.data.email, response.data.username)
}


const logout = async () => {
    removeToken();
}

const getToken = async () => {
    return window.localStorage.getItem(localStorageKey);
}

const removeToken = async () => {
    return window.localStorage.removeItem(localStorageKey);
}

const getMySheets = async () => {
    let response = await httpClient.get(`${apiUrl}api/sheets/`);
    return response.data;
}

const addNewSheet = async (name) => {
    let response = await httpClient.post(`${apiUrl}api/sheets/`, {
        name: name,
        user: null,
    })
    return response
}

const getSupportedTools = async () => {
    let response = await httpClient.get(`${apiUrl}api/tools/supported`)
    return response.data
}

const solve = async (origin, body) => {
    let response = await httpClient.post(`${apiUrl}api/tools/solve?origin=${origin}`, body)
    return response.data
}

const save = async (name, body) => {
    let response = await httpClient.put(`${apiUrl}api/sheets/${name}`, {
        content: body
    })
    return response.data
}

const deleteSpreadsheet = async (name) => {
    let response = await httpClient.delete(`${apiUrl}api/sheets/${name}`)
    return response.data
}
const register = async (email, username, password, reppassword) => {

    let response = await httpClient.post(`${apiUrl}users/auth/register`, {
        email: email,
        username: username,
        password1: password,
        password2: reppassword,
    })
        .then(response => {
            //sd
        })
        .catch(err => {
            console.error(err.response.data.errors);
        });
    return response
}
const getCommandHistory = (pk) => {
    return JSON.parse(window.localStorage.getItem(pk))
}

const pushToCommandHistory = (pk, data) => {
    let prevData = getCommandHistory(pk)
    
    if(prevData!=null){
        prevData.push(data)
    }else{
        prevData = []
        prevData.push(data)
    }
     
    window.localStorage.setItem(pk,JSON.stringify(prevData))
}


const removeCommandHistory = (pk) => {
    window.localStorage.removeItem(pk)
}
export { removeCommandHistory, getCommandHistory, pushToCommandHistory, register, login, logout, save, getToken, removeToken, getCurrentUser, getMySheets, addNewSheet, getSupportedTools, solve, deleteSpreadsheet }