import { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../services';


const AuthContext = createContext();

const useAuth = () => {
    const context = useContext(AuthContext)
    const isPending = context.state.status === 'pending'
    const isError = context.state.status === 'error'
    const isSuccess = context.state.status === 'success'
    const isAuthenticated = context.state.user && isSuccess

    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return {
        ...context,
        isPending,
        isError,
        isSuccess,
        isAuthenticated,
    }
}

const bootstrap = async () => {
    let user = null;
    let error = null;
    let status = 'pending';
    const token = await auth.getToken();

    if (token) {
        try {
            user = await auth.getCurrentUser();
            status = 'success'
        } catch (e) {
            error = 'error';
        }
    }

    return [user, error, status];
}
const AuthProvider = (props) => {
    const [state, setState] = useState({
        status: 'pending',
        error: null,
        user: null,
    })

    useEffect(() => {
        async function bootstrapApp() {
            const [user, error, status] = await bootstrap();
            setState({
                status: status,
                error: error,
                user: user,
            })
        }
        bootstrapApp();

    }, [])

    const login = async (email, password) => {
        await auth.login(email, password);
        const [user, error, status] = await bootstrap();
        setState({
            status: status,
            error: error,
            user: user,
        })
    }

    const logout = async () => {
        await auth.logout();
        const [user, error, status] = await bootstrap();
        setState({
            status: status,
            error: error,
            user: user,
        })
    }

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, useAuth }