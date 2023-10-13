import { createContext } from "react";

type AuthContextType = {
    email: string,
    setEmail: any,
    password: string,
    setPassword: any,
    fname: string,
    setFName: any,
    loggedIn: boolean,
    setLoggedIn: any
}

export const AuthContext = createContext<AuthContextType>({email: "", setEmail: null, password: "", setPassword: null, fname: "", setFName: null, loggedIn: false, setLoggedIn: null});
