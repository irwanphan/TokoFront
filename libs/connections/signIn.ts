import { supabase } from "./supabase";

export default async function signIn(supabaseClient:any) {
    const { error } = await supabaseClient.auth.signIn({ provider: "google" });
    if (error) console.log(error);
}

export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}