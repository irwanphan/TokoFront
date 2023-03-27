import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@libs/theme'
import { RecoilRoot } from 'recoil'

import { supabase } from '@libs/connections/supabase'
import { type Session } from '@supabase/gotrue-js/src/lib/types'
// import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'
import { PageProps } from 'types/types'
import { AuthProvider } from '@contexts/authContext'
import axios from 'axios'
import { useFetchSettings } from '@hooks/useFetchSettings'

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
export default function App({ Component, pageProps }: AppProps<PageProps>) {
  const [ session, setSession ] = useState<Session | null | any>(null)
  // const [ currentUser, setCurrentUser ] = useState<any>()
  // const [ settings, setSettings ] = useState(null)
  
  const getInitialSession = () => {
    // NOTE: there's already session.user on session
    // const user = supabase.auth.getUser()
    //   .then(res => setCurrentUser(res.data.user))
    //   .then(() => sessionStorage.setItem("sessionUser", currentUser))

    const supabaseSession = supabase.auth.getSession()
      .then(res => setSession(res.data.session))
  }

  useEffect(() => {
    let mounted = true
    // let sessionUser = sessionStorage.getItem("sessionUser")
    // if (session) {
    //   // TODO: set to global later
    //   // setCurrentUser(sessionUser)
    // }
    if (!session) {
      getInitialSession()
    }

    const data = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    }).data
    mounted = false
  }, [])
  // console.log('user: ', currentUser)
  // console.log('session: ', session)

  const { settings, isLoadingSettings } = useFetchSettings()
      
  return (
    // <SessionProvider session={session}>
    <RecoilRoot>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component 
            {...pageProps} 
            session={session} 
            user={session?.user} 
            settings={settings}
            isLoadingSettings={isLoadingSettings}
          />
        </ChakraProvider>
      </AuthProvider>
    </RecoilRoot>
    // </SessionProvider>
  ) 
}
