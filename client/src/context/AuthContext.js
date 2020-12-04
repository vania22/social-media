import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import jwtDecode from "jwt-decode";

export const AuthContext = React.createContext(null)

const AuthContextProvider = ({children}) => {
    const {pathname} = useLocation()
    let initialState = JSON.parse(localStorage.getItem('user')) || null

    const [user, setUser] = useState(initialState)

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const decodedToken = jwtDecode(JSON.parse(localStorage.getItem('user')).token);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout()
            }
        } else {
            if(user) {
                logout()
            }
        }
    }, [pathname])

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
