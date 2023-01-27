import { supabase } from "./supabase"

export default async function signIn(supabaseClient:any) {
    const { error } = await supabaseClient.auth.signIn({ provider: "google" })
    if (error) console.log(error);
}

const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'https://tokofront.vercel.app/'
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to including trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
        return url
    }

export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: getURL()
        }
    })
}