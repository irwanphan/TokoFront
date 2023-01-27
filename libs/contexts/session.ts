import { atom } from "recoil"
import { Session } from "@supabase/supabase-js" 

export const sessionState = atom({
    key: 'session',
    default: null as Session | null
})