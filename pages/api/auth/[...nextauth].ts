import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
        verifyRequest: '/',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ]
})

// TODO: implement nextAuth Supabase adapter
// https://www.youtube.com/watch?v=EdYQ9fF-hz4