"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged} from "firebase/auth";
import { UserType } from "@/types";
import { auth } from "@/db/config";

const Context = createContext({});

const AuthContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const initialState = {
        user: null,
        isLogin: false,
    }
    const [user, setUser] = useState<UserType>(initialState);

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth ,(userState) => {
            if (userState) {
                setUser({
                    user: userState,
                    isLogin: true
                })
            } else {
                setUser(initialState);
            }
            setLoading(false);
        });
        return subscribe;
    }, []);

    return (
        <Context.Provider value={{ user, setUser }}>
            {loading && (<div className="h-screen flex w-full justify-center items-center">Loading...</div>)}
            {!loading && children}
        </Context.Provider>
    );
}

export const AuthContext = () => useContext(Context);
export default AuthContextProvider;
