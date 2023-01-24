import { createContext, ReactNode, useContext, useState, useEffect } from "react"
import { supabase } from '@libs/connections/supabase'
import { type Session } from '@supabase/gotrue-js/src/lib/types'
import { useRecoilState } from "recoil"
import { sessionState } from "./session"

type authContextType = {
    isLoadingSession: boolean
    session: Session | null
    user: any
    // login: () => void
    // logout: () => void
}
const authContextDefaultValues: authContextType = {
    isLoadingSession: true,
    session: null,
    user: null,
    // login: () => {},
    // logout: () => {},
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
    return useContext(AuthContext)
}

type Props = {
    children: ReactNode
}

export function AuthProvider({ children }: Props) {
    const [ session, setSession ] = useRecoilState<Session | null | any>(sessionState)
    const [ user, setUser ] = useState<any>(null)
    const [ isLoadingSession, setIsLoadingSession ] = useState<boolean>(true)
  
    const getInitialSession = () => {
        // NOTE: there's already session.user on session
        // const user = supabase.auth.getUser()
        //   .then(res => setCurrentUser(res.data.user))
        //   .then(() => sessionStorage.setItem("sessionUser", currentUser))
        const supabaseSession = supabase.auth.getSession()
            .then(res => setSession(res.data.session))
    }

    useEffect(() => {
        // let mounted = true
        // let sessionUser = sessionStorage.getItem("sessionUser")
        // if (session) {
        //   // TODO: set to global later
        //   // setCurrentUser(sessionUser)
        // }
        const fetchSession = async () => {
            try {
                if (!session) {
                    getInitialSession()
                }
                const data = supabase.auth.onAuthStateChange((_event, session) => {
                    setSession(session)
                }).data
        
                if (session) {
                    setUser(session.user)
                }
                setIsLoadingSession(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSession()
    }, [session])
    // console.log('user: ', currentUser)
    // console.log('session: ', session)

    const value = {
        isLoadingSession,
        session,
        user,
        // login,
        // logout,
    }
  
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    )
}